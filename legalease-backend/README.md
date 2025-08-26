# LegalEase AI Backend

A comprehensive backend system for the LegalEase AI application that provides legal document analysis, chat functionality, and automated legal agreement generation using Google's Gemini AI.

## Features

- **Document Upload & Analysis**: Upload legal documents (PDF, DOCX, TXT) and get AI-powered analysis
- **Interactive Chat**: Chat with AI about uploaded documents or general legal questions
- **Agreement Generation**: Generate professional legal agreements with predefined templates
- **PDF Generation**: Create formatted PDF documents with legal agreements
- **Gemini AI Integration**: Powered by Google's Gemini AI for intelligent legal assistance

## API Endpoints

### Document Upload
- `POST /api/upload` - Upload and analyze legal documents
- `POST /api/chat/upload` - Chat about uploaded documents

### Agreement Generation
- `POST /api/generate-agreement` - Generate legal agreements
- `GET /api/download/<filename>` - Download generated PDF files

### General Chat
- `POST /api/chat/general` - General legal chat assistance

## Supported Agreement Types

1. **Service Agreement** - Professional service contracts
2. **Rental Agreement** - Residential rental contracts
3. **Employment Agreement** - Employment contracts with probation periods
4. **Non-Disclosure Agreement (NDA)** - Confidentiality agreements
5. **Custom Agreements** - User-defined agreement types

## Installation & Setup

### Prerequisites
- Python 3.11+
- Google Gemini API Key

### Installation Steps

1. **Clone/Extract the project**
   ```bash
   cd legalease-backend
   ```

2. **Activate virtual environment**
   ```bash
   source venv/bin/activate
   ```

3. **Install dependencies** (already installed)
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   export GEMINI_API_KEY="your_actual_gemini_api_key_here"
   ```

5. **Run the application**
   ```bash
   python src/main.py
   ```

The server will start on `http://0.0.0.0:5000`

## Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key (required)

## Project Structure

```
legalease-backend/
├── src/
│   ├── main.py                 # Main Flask application
│   ├── models/                 # Database models
│   ├── routes/
│   │   ├── user.py            # User routes (template)
│   │   └── legal.py           # Legal AI routes
│   ├── templates/
│   │   ├── __init__.py
│   │   └── agreement_templates.py  # Legal agreement templates
│   ├── static/                # Static files directory
│   └── database/              # SQLite database
├── venv/                      # Virtual environment
├── requirements.txt           # Python dependencies
└── README.md                 # This file
```

## API Usage Examples

### Upload Document
```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Content-Type: application/json" \
  -d '{
    "file_content": "base64_encoded_file_content",
    "file_name": "contract.pdf",
    "file_type": "application/pdf"
  }'
```

### Generate Service Agreement
```bash
curl -X POST http://localhost:5000/api/generate-agreement \
  -H "Content-Type: application/json" \
  -d '{
    "agreement_type": "service",
    "form_data": {
      "serviceProviderName": "Acme Corp",
      "clientName": "Client Inc",
      "serviceDescription": "Web development services",
      "serviceFee": "$5000",
      "startDate": "2025-09-01",
      "endDate": "2025-12-31"
    }
  }'
```

### Chat with AI
```bash
curl -X POST http://localhost:5000/api/chat/general \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is a non-disclosure agreement?"
  }'
```

## Features in Detail

### Predefined Legal Templates
The system includes comprehensive legal templates with predefined clauses for:
- Standard legal formatting
- Industry-standard terms and conditions
- Protective clauses and boilerplate text
- Professional signature blocks

### AI Enhancement
- Gemini AI reviews and suggests improvements to generated agreements
- Context-aware responses based on uploaded documents
- Legal accuracy validation and risk assessment

### PDF Generation
- Professional formatting with headers and footers
- Automatic text wrapping and pagination
- AI suggestions included as appendix
- Download functionality for generated documents

## Security Considerations

- API keys stored as environment variables
- Input validation on all endpoints
- CORS enabled for frontend integration
- Temporary file cleanup for uploaded documents

## Deployment

The application is ready for deployment and includes:
- CORS configuration for frontend integration
- Proper error handling and logging
- Scalable Flask architecture
- Environment-based configuration

## Dependencies

Key dependencies include:
- Flask - Web framework
- Flask-CORS - Cross-origin resource sharing
- google-generativeai - Gemini AI integration
- fpdf2 - PDF generation
- SQLAlchemy - Database ORM (optional)

## Legal Disclaimer

This system provides general legal information and document templates. It is not a substitute for professional legal advice. Users should consult with qualified legal professionals for specific legal matters.

## Support

For technical support or questions about the backend implementation, please refer to the code documentation and comments within the source files.

