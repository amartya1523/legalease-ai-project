// API Service for LegalEase AI Backend Integration
// This service handles all API calls according to your backend design specification

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Types for API responses
interface UploadResponse {
  document_id: string;
  status: 'analyzing' | 'ready';
  initial_bot_message: string;
}

interface ChatResponse {
  bot_response: string;
}

interface GenerateAgreementResponse {
  pdf_url: string;
}

interface ApiError {
  error: string;
  message?: string;
}

// Utility function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data:mime/type;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// API service class
class LegalEaseAPI {
  private async makeRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          error: 'Network error',
          message: `HTTP ${response.status}: ${response.statusText}`
        }));
        throw new Error(errorData.message || errorData.error || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error on ${endpoint}:`, error);
      throw error;
    }
  }

  // Document Upload API
  async uploadDocument(file: File): Promise<UploadResponse> {
    const base64Content = await fileToBase64(file);
    
    return this.makeRequest<UploadResponse>('/upload', {
      method: 'POST',
      body: JSON.stringify({
        file_content: base64Content,
        file_name: file.name,
        file_type: file.type,
      }),
    });
  }

  // Document Chat API
  async chatWithDocument(documentId: string, message: string): Promise<ChatResponse> {
    return this.makeRequest<ChatResponse>('/chat/upload', {
      method: 'POST',
      body: JSON.stringify({
        document_id: documentId,
        message: message,
      }),
    });
  }

  // General Chat API
  async generalChat(message: string): Promise<ChatResponse> {
    return this.makeRequest<ChatResponse>('/chat/general', {
      method: 'POST',
      body: JSON.stringify({
        message: message,
      }),
    });
  }

  // Agreement Generation API
  async generateAgreement(agreementType: string, formData: Record<string, any>): Promise<GenerateAgreementResponse> {
    return this.makeRequest<GenerateAgreementResponse>('/generate-agreement', {
      method: 'POST',
      body: JSON.stringify({
        agreement_type: agreementType,
        form_data: formData,
      }),
    });
  }

  // Helper method to download generated PDF
  downloadPDF(pdfUrl: string, filename?: string) {
    const link = document.createElement('a');
    link.href = pdfUrl.startsWith('http') ? pdfUrl : `${API_BASE_URL}${pdfUrl}`;
    link.download = filename || 'generated_agreement.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Export singleton instance
export const legalEaseAPI = new LegalEaseAPI();

// Export types for use in components
export type {
  UploadResponse,
  ChatResponse,
  GenerateAgreementResponse,
  ApiError,
};