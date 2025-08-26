from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import google.generativeai as genai
import os
import uuid
import base64
import tempfile
from fpdf import FPDF
import json
from src.templates.agreement_templates import get_template_by_type, format_template

legal_bp = Blueprint('legal', __name__)

# Configure Gemini API
genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')

# In-memory storage for documents and chat history
documents = {}
chat_histories = {}

@legal_bp.route('/upload', methods=['POST'])
@cross_origin()
def upload_document():
    try:
        data = request.json
        file_content = data.get('file_content')
        file_name = data.get('file_name')
        file_type = data.get('file_type')
        
        if not file_content or not file_name:
            return jsonify({'error': 'Missing file content or name'}), 400
        
        # Generate unique document ID
        document_id = str(uuid.uuid4())
        
        # Decode base64 content
        try:
            decoded_content = base64.b64decode(file_content)
        except Exception as e:
            return jsonify({'error': 'Invalid base64 content'}), 400
        
        # For text files, we can directly analyze the content
        # For PDFs and other formats, we'll need to extract text first
        if file_type == 'text/plain':
            text_content = decoded_content.decode('utf-8')
        else:
            # For now, we'll handle PDFs and other formats as text
            # In a production environment, you'd use proper PDF parsing libraries
            text_content = "Document uploaded successfully. Content analysis available."
        
        # Analyze document with Gemini
        analysis_prompt = f"""
        Analyze this legal document and provide:
        1. Document type identification
        2. Key clauses and terms
        3. Potential risks or issues
        4. Summary of main points
        
        Document content:
        {text_content[:2000]}  # Limit content to avoid token limits
        
        Provide a conversational response as if you're a legal AI assistant.
        """
        
        try:
            response = model.generate_content(analysis_prompt)
            initial_message = response.text
        except Exception as e:
            initial_message = f"I've received your document '{file_name}'. This appears to be a legal document. What would you like to know about it? I can help explain clauses, identify potential issues, or answer specific questions."
        
        # Store document information
        documents[document_id] = {
            'file_name': file_name,
            'file_type': file_type,
            'content': text_content,
            'analysis': initial_message
        }
        
        # Initialize chat history for this document
        chat_histories[document_id] = []
        
        return jsonify({
            'document_id': document_id,
            'status': 'ready',
            'initial_bot_message': initial_message
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@legal_bp.route('/chat/upload', methods=['POST'])
@cross_origin()
def chat_upload():
    try:
        data = request.json
        document_id = data.get('document_id')
        message = data.get('message')
        
        if not document_id or not message:
            return jsonify({'error': 'Missing document_id or message'}), 400
        
        if document_id not in documents:
            return jsonify({'error': 'Document not found'}), 404
        
        # Get document content and chat history
        document = documents[document_id]
        chat_history = chat_histories.get(document_id, [])
        
        # Build context for Gemini
        context = f"""
        Document: {document['file_name']}
        Content: {document['content'][:1500]}
        
        Previous conversation:
        """
        
        for chat in chat_history[-5:]:  # Last 5 messages for context
            context += f"User: {chat['user']}\nAssistant: {chat['bot']}\n"
        
        context += f"\nUser: {message}\n\nPlease provide a helpful response based on the document content and conversation history."
        
        try:
            response = model.generate_content(context)
            bot_response = response.text
        except Exception as e:
            bot_response = "I understand your question about the document. Based on my analysis, I can help you with legal document interpretation. Could you please rephrase your question?"
        
        # Store chat history
        chat_histories[document_id].append({
            'user': message,
            'bot': bot_response
        })
        
        return jsonify({
            'bot_response': bot_response
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@legal_bp.route('/chat/general', methods=['POST'])
@cross_origin()
def chat_general():
    try:
        data = request.json
        message = data.get('message')
        
        if not message:
            return jsonify({'error': 'Missing message'}), 400
        
        # General legal chat prompt
        prompt = f"""
        You are a legal AI assistant. Please provide a helpful, informative response to this legal question:
        
        {message}
        
        Provide accurate legal information while noting that this is general information and not legal advice.
        """
        
        try:
            response = model.generate_content(prompt)
            bot_response = response.text
        except Exception as e:
            bot_response = "I'm here to help with legal questions. Could you please provide more details about what you'd like to know?"
        
        return jsonify({
            'bot_response': bot_response
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@legal_bp.route('/generate-agreement', methods=['POST'])
@cross_origin()
def generate_agreement():
    try:
        data = request.json
        agreement_type = data.get('agreement_type')
        form_data = data.get('form_data')
        
        if not agreement_type or not form_data:
            return jsonify({'error': 'Missing agreement_type or form_data'}), 400
        
        # Get predefined template
        template = get_template_by_type(agreement_type)
        formatted_template = format_template(template, form_data)
        
        # Enhance content with Gemini AI
        enhanced_content = enhance_agreement_with_ai(formatted_template, agreement_type, form_data)
        
        # Generate PDF with enhanced content
        pdf_path = generate_enhanced_pdf(enhanced_content, agreement_type, form_data)
        
        return jsonify({
            'pdf_url': f'/api/download/{os.path.basename(pdf_path)}'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def enhance_agreement_with_ai(template, agreement_type, form_data):
    """Use Gemini AI to enhance the predefined template with additional clauses"""
    
    prompt = f"""
    Review and enhance this {agreement_type} agreement template. Add any missing important clauses 
    and ensure legal completeness while maintaining the existing structure.
    
    Current template:
    {template['title']}
    
    Sections:
    """
    
    for section in template['sections']:
        prompt += f"\n{section['title']}\n{section['content']}\n"
    
    prompt += f"\nSignature Block:\n{template['signature_block']}"
    
    prompt += f"""
    
    Form Data: {json.dumps(form_data, indent=2)}
    
    Please provide suggestions for additional clauses or improvements while keeping the existing structure.
    Focus on legal accuracy and completeness for a {agreement_type} agreement.
    """
    
    try:
        response = model.generate_content(prompt)
        ai_suggestions = response.text
        
        # For now, return the original template with AI suggestions as a comment
        # In a production system, you might parse and integrate the AI suggestions
        enhanced_template = template.copy()
        enhanced_template['ai_suggestions'] = ai_suggestions
        return enhanced_template
        
    except Exception as e:
        # If AI enhancement fails, return the original template
        return template

def generate_enhanced_pdf(template, agreement_type, form_data):
    """Generate PDF from enhanced template with professional formatting"""
    
    class EnhancedPDF(FPDF):
        def __init__(self):
            super().__init__()
            self.set_auto_page_break(auto=True, margin=15)
        
        def header(self):
            self.set_font('Arial', 'B', 20)
            self.cell(0, 15, template['title'], 0, 1, 'C')
            self.ln(5)
            # Add a line under the header
            self.set_draw_color(128, 128, 128)
            self.line(20, self.get_y(), 190, self.get_y())
            self.ln(10)
        
        def footer(self):
            self.set_y(-15)
            self.set_font('Arial', 'I', 8)
            self.set_text_color(128, 128, 128)
            self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
        
        def add_section(self, title, content):
            # Section title
            self.set_font('Arial', 'B', 14)
            self.set_text_color(0, 0, 0)
            self.cell(0, 10, title, 0, 1, 'L')
            self.ln(2)
            
            # Section content
            self.set_font('Arial', '', 11)
            self.set_text_color(40, 40, 40)
            
            # Split content into paragraphs
            paragraphs = content.split('\n\n')
            for paragraph in paragraphs:
                if paragraph.strip():
                    # Handle long lines by wrapping text
                    lines = self.wrap_text(paragraph.strip(), 170)
                    for line in lines:
                        self.cell(0, 6, line, 0, 1, 'L')
                    self.ln(3)
            self.ln(5)
        
        def wrap_text(self, text, max_width):
            """Wrap text to fit within specified width"""
            words = text.split(' ')
            lines = []
            current_line = ''
            
            for word in words:
                test_line = current_line + (' ' if current_line else '') + word
                if self.get_string_width(test_line) <= max_width:
                    current_line = test_line
                else:
                    if current_line:
                        lines.append(current_line)
                    current_line = word
            
            if current_line:
                lines.append(current_line)
            
            return lines
    
    pdf = EnhancedPDF()
    pdf.add_page()
    
    # Add all sections
    for section in template['sections']:
        pdf.add_section(section['title'], section['content'])
    
    # Add signature block
    pdf.ln(10)
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, 'SIGNATURES', 0, 1, 'L')
    pdf.ln(5)
    
    pdf.set_font('Arial', '', 11)
    signature_lines = template['signature_block'].split('\n')
    for line in signature_lines:
        if line.strip():
            pdf.cell(0, 6, line, 0, 1, 'L')
    
    # Add AI suggestions as an appendix if available
    if 'ai_suggestions' in template:
        pdf.add_page()
        pdf.add_section('AI LEGAL REVIEW SUGGESTIONS', 
                       "The following suggestions were generated by AI for your consideration:\n\n" + 
                       template['ai_suggestions'])
    
    # Save PDF to temporary file
    temp_dir = tempfile.gettempdir()
    pdf_filename = f"{agreement_type}_{uuid.uuid4().hex[:8]}.pdf"
    pdf_path = os.path.join(temp_dir, pdf_filename)
    pdf.output(pdf_path)
    
    return pdf_path

@legal_bp.route('/download/<filename>')
@cross_origin()
def download_file(filename):
    """Serve generated PDF files"""
    try:
        temp_dir = tempfile.gettempdir()
        file_path = os.path.join(temp_dir, filename)
        
        if os.path.exists(file_path):
            from flask import send_file
            return send_file(file_path, as_attachment=True, download_name=filename)
        else:
            return jsonify({'error': 'File not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

