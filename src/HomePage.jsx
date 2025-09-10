import { useState } from "react";
import { Upload, FileText, Send, Check, AlertCircle, Download } from "lucide-react";
import './HomePage.css';

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectTitle: '',
    uploadedFile: null,
    latexTemplate: '',
    pages: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // LaTeX templates configuration
  const latexTemplates = [
    {
      id: 'bannari',
      name: 'Bannari Amman Institute of Technology',
      description: 'Standard academic report format with institutional branding',
      preview: '📋 BIT Format'
    },
    {
      id: 'ieee',
      name: 'IEEE Conference Template',
      description: 'Professional IEEE conference paper format',
      preview: '📄 IEEE Format'
    },
    {
      id: 'generic',
      name: 'Generic Academic Template',
      description: 'Standard academic report template',
      preview: '📝 Generic Format'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate file validation
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (validTypes.includes(file.type)) {
        setFormData(prev => ({ ...prev, uploadedFile: file }));
        setUploadStatus('success');
        
        // Simulate file processing
        setTimeout(() => {
          setUploadStatus('processed');
        }, 2000);
      } else {
        setUploadStatus('error');
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleGenerateReport = () => {
    setIsProcessing(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(5); // Show completion step
    }, 3000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.projectTitle.trim().length > 0;
      case 2: return formData.uploadedFile !== null && uploadStatus === 'processed';
      case 3: return formData.latexTemplate !== '';
      case 4: return formData.pages > 0;
      default: return false;
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="chat-step">
            <div className="bot-message">
              <div className="bot-avatar">🤖</div>
              <div className="message-content">
                <p>Hello! I'm here to help you generate your academic report. Let's start with your project title.</p>
              </div>
            </div>
            <div className="input-container">
              <div className="input-wrapper">
                <FileText className="input-icon" size={20} />
                <input
                  type="text"
                  placeholder="Enter your project title..."
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                  className="chat-input"
                  autoFocus
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="chat-step">
            <div className="bot-message">
              <div className="bot-avatar">🤖</div>
              <div className="message-content">
                <p>Great! Now please upload your abstract file (PDF, DOC, or DOCX format).</p>
              </div>
            </div>
            
            {formData.projectTitle && (
              <div className="user-message">
                <div className="message-content">
                  <p>{formData.projectTitle}</p>
                </div>
                <div className="user-avatar">👤</div>
              </div>
            )}

            <div className="upload-container">
              <div className="upload-zone" onClick={() => document.getElementById('file-upload').click()}>
                <Upload className="upload-icon" size={32} />
                <p className="upload-text">
                  {formData.uploadedFile ? formData.uploadedFile.name : 'Click to upload your file'}
                </p>
                <p className="upload-subtext">PDF, DOC, DOCX up to 10MB</p>
                
                {uploadStatus === 'success' && (
                  <div className="upload-status success">
                    <Check size={16} />
                    <span>File uploaded successfully</span>
                  </div>
                )}
                
                {uploadStatus === 'processed' && (
                  <div className="upload-status processed">
                    <Check size={16} />
                    <span>File processed and ready</span>
                  </div>
                )}
                
                {uploadStatus === 'error' && (
                  <div className="upload-status error">
                    <AlertCircle size={16} />
                    <span>Invalid file type. Please upload PDF, DOC, or DOCX</span>
                  </div>
                )}
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="chat-step">
            <div className="bot-message">
              <div className="bot-avatar">🤖</div>
              <div className="message-content">
                <p>Perfect! Now choose your preferred LaTeX template format.</p>
              </div>
            </div>

            <div className="template-selection">
              {latexTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${formData.latexTemplate === template.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange('latexTemplate', template.id)}
                >
                  <div className="template-preview">{template.preview}</div>
                  <div className="template-info">
                    <h3 className="template-name">{template.name}</h3>
                    <p className="template-description">{template.description}</p>
                  </div>
                  {formData.latexTemplate === template.id && (
                    <div className="selected-indicator">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="chat-step">
            <div className="bot-message">
              <div className="bot-avatar">🤖</div>
              <div className="message-content">
                <p>Almost there! How many pages should your report be?</p>
              </div>
            </div>
            
            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder="Number of pages (1-50)"
                  value={formData.pages}
                  onChange={(e) => handleInputChange('pages', e.target.value)}
                  className="chat-input"
                  min="1"
                  max="50"
                  autoFocus
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="chat-step completion-step">
            <div className="bot-message">
              <div className="bot-avatar">🎉</div>
              <div className="message-content">
                <p>Excellent! Your report has been generated successfully.</p>
              </div>
            </div>
            
            <div className="completion-summary">
              <div className="summary-item">
                <span className="summary-label">Project:</span>
                <span className="summary-value">{formData.projectTitle}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Template:</span>
                <span className="summary-value">
                  {latexTemplates.find(t => t.id === formData.latexTemplate)?.name}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Pages:</span>
                <span className="summary-value">{formData.pages}</span>
              </div>
            </div>

            <button className="download-button">
              <Download size={16} />
              Download Report
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="homepage-container">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="header-info">
            <h1 className="chat-title">AutoDraft AI Assistant</h1>
            <p className="chat-subtitle">Academic Report Generation</p>
          </div>
          <div className="progress-indicator">
            <span className="step-counter">{currentStep}/4</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>

        {/* Chat Content */}
        <div className="chat-content">
          {getStepContent()}
        </div>

        {/* Action Buttons */}
        {currentStep < 5 && (
          <div className="chat-actions">
            {currentStep > 1 && (
              <button 
                className="action-button secondary"
                onClick={handlePrevStep}
              >
                Back
              </button>
            )}
            
            {currentStep < 4 ? (
              <button 
                className={`action-button primary ${!canProceed() ? 'disabled' : ''}`}
                onClick={handleNextStep}
                disabled={!canProceed()}
              >
                Continue
                <Send size={16} />
              </button>
            ) : (
              <button 
                className={`action-button generate ${!canProceed() || isProcessing ? 'disabled' : ''}`}
                onClick={handleGenerateReport}
                disabled={!canProceed() || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Report
                    <Send size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}