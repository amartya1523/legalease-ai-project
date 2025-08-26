# LegalEase AI - Complete Project Deployment Instructions

## Project Overview

This package contains a complete LegalEase AI application with:
- **Frontend**: Next.js React application with modern UI
- **Backend**: Flask API server with Gemini AI integration
- **Features**: Document analysis, chat functionality, and legal agreement generation

## Prerequisites

### System Requirements
- Python 3.11+
- Node.js 18+
- npm or pnpm
- Google Gemini API Key

### API Key Setup
1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Keep this key secure - you'll need it for backend configuration

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd legalease-backend
```

### 2. Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Set Environment Variables
```bash
# Linux/Mac
export GEMINI_API_KEY="your_actual_gemini_api_key_here"

# Windows
set GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 5. Start Backend Server
```bash
python src/main.py
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Configure API Endpoints
The frontend is already configured to work with the backend at `http://localhost:5000`. If you deploy the backend elsewhere, update the API endpoints in the frontend code.

### 4. Start Frontend Development Server
```bash
npm run dev
# or
pnpm dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

The backend provides the following endpoints:

### Document Management
- `POST /api/upload` - Upload and analyze documents
- `POST /api/chat/upload` - Chat about uploaded documents

### Agreement Generation
- `POST /api/generate-agreement` - Generate legal agreements
- `GET /api/download/<filename>` - Download generated PDFs

### General Chat
- `POST /api/chat/general` - General legal assistance

## Supported Agreement Types

1. **Service Agreement** - Professional service contracts
2. **Rental Agreement** - Residential rental contracts  
3. **Employment Agreement** - Employment contracts
4. **Non-Disclosure Agreement (NDA)** - Confidentiality agreements
5. **Custom Agreements** - User-defined types

## Production Deployment

### Backend Deployment Options

#### Option 1: Traditional Server
```bash
# Install production WSGI server
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 src.main:app
```

#### Option 2: Docker Deployment
Create `Dockerfile` in backend directory:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY src/ ./src/
ENV GEMINI_API_KEY=your_key_here
EXPOSE 5000
CMD ["python", "src/main.py"]
```

### Frontend Deployment Options

#### Option 1: Static Build
```bash
npm run build
npm start
```

#### Option 2: Vercel/Netlify
The frontend is ready for deployment on Vercel, Netlify, or similar platforms.

## Environment Variables

### Backend (.env file)
```
GEMINI_API_KEY=your_gemini_api_key
FLASK_ENV=production
```

### Frontend (.env.local file)
```
NEXT_PUBLIC_API_URL=http://your-backend-url.com
```

## Security Considerations

1. **API Keys**: Never expose Gemini API keys in frontend code
2. **CORS**: Backend is configured for development - adjust for production
3. **File Upload**: Implement file size limits and validation
4. **Rate Limiting**: Consider implementing rate limiting for API endpoints

## Troubleshooting

### Common Issues

#### Backend Issues
- **Import Errors**: Ensure virtual environment is activated
- **API Key Errors**: Verify GEMINI_API_KEY is set correctly
- **Port Conflicts**: Change port in `src/main.py` if needed

#### Frontend Issues
- **API Connection**: Check backend is running on correct port
- **Build Errors**: Ensure all dependencies are installed
- **CORS Errors**: Verify backend CORS configuration

### Testing the Setup

1. **Backend Test**:
   ```bash
   curl http://localhost:5000/api/chat/general \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello"}'
   ```

2. **Frontend Test**: 
   - Open `http://localhost:3000`
   - Try uploading a document or generating an agreement

## File Structure

```
legalease-ai-project/
├── legalease-backend/
│   ├── src/
│   │   ├── main.py              # Flask app entry point
│   │   ├── routes/
│   │   │   └── legal.py         # API endpoints
│   │   └── templates/
│   │       └── agreement_templates.py  # Legal templates
│   ├── requirements.txt         # Python dependencies
│   └── README.md               # Backend documentation
├── frontend/
│   ├── app/                    # Next.js app directory
│   ├── components/             # React components
│   ├── package.json           # Node.js dependencies
│   └── ...                    # Other frontend files
└── backend_design.md          # Technical documentation
```

## Support

For technical issues:
1. Check the README files in each directory
2. Verify all dependencies are installed
3. Ensure API keys are configured correctly
4. Check console/terminal for error messages

## Legal Disclaimer

This application provides general legal information and document templates. It is not a substitute for professional legal advice. Users should consult with qualified legal professionals for specific legal matters.

---

**Note**: Remember to replace `your_actual_gemini_api_key_here` with your real Gemini API key before running the application.

