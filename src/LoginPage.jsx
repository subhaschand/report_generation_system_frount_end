import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginStatus(null);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        setLoginStatus('success');
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        setLoginStatus('error');
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginStatus('error');
      setErrorMessage("Something went wrong! Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  function signpage(){
    navigate("/signup");
  }

  const handleNextStep = () => {
    if (currentStep === 1 && email.includes('@') && email.includes('.')) {
      setCurrentStep(2);
    } else if (currentStep === 2 && password.length >= 6) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceedStep1 = email.includes('@') && email.includes('.');
  const canProceedStep2 = password.length >= 6;

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="login-step">
            <div className="bot-message">
              <div className="bot-avatar">🔐</div>
              <div className="message-content">
                <p>Welcome back to AutoDraft AI! Please enter your email address to get started.</p>
              </div>
            </div>
            
            <div className="input-container">
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="chat-input"
                  autoFocus
                />
              </div>
              {email && !canProceedStep1 && (
                <div className="validation-message error">
                  <AlertCircle size={14} />
                  <span>Please enter a valid email address</span>
                </div>
              )}
              {canProceedStep1 && (
                <div className="validation-message success">
                  <CheckCircle size={14} />
                  <span>Email looks good!</span>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="login-step">
            <div className="bot-message">
              <div className="bot-avatar">🔐</div>
              <div className="message-content">
                <p>Great! Now please enter your password to access your account.</p>
              </div>
            </div>

            {email && (
              <div className="user-message">
                <div className="message-content">
                  <p>{email}</p>
                </div>
                <div className="user-avatar">👤</div>
              </div>
            )}
            
            <div className="input-container">
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="chat-input password-input"
                  autoFocus
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && !canProceedStep2 && (
                <div className="validation-message error">
                  <AlertCircle size={14} />
                  <span>Password must be at least 6 characters</span>
                </div>
              )}
              {canProceedStep2 && (
                <div className="validation-message success">
                  <CheckCircle size={14} />
                  <span>Password strength looks good!</span>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="login-step">
            <div className="bot-message">
              <div className="bot-avatar">🚀</div>
              <div className="message-content">
                <p>Perfect! Ready to sign you in. Click the button below to access your dashboard.</p>
              </div>
            </div>

            <div className="credentials-summary">
              <div className="credential-item">
                <Mail className="credential-icon" size={16} />
                <span className="credential-value">{email}</span>
              </div>
              <div className="credential-item">
                <Lock className="credential-icon" size={16} />
                <span className="credential-value">{'•'.repeat(password.length)}</span>
              </div>
            </div>

            {loginStatus === 'error' && (
              <div className="login-status error">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {loginStatus === 'success' && (
              <div className="login-status success">
                <CheckCircle size={16} />
                <span>Login successful! Redirecting to dashboard...</span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="login-container">
      <div className="login-chat-container">
        {/* Header */}
        <div className="login-header">
          <div className="header-info">
            <h1 className="login-title">Sign In</h1>
            <p className="login-subtitle">Access your AutoDraft AI account</p>
          </div>
          <div className="progress-indicator">
            <span className="step-counter">{currentStep}/3</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleLogin} className="login-form-content">
          <div className="chat-content">
            {getStepContent()}
          </div>

          {/* Action Buttons */}
          <div className="login-actions">
            {currentStep > 1 && currentStep < 3 && (
              <button 
                type="button"
                className="action-button secondary"
                onClick={handlePrevStep}
              >
                Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button 
                type="button"
                className={`action-button primary ${
                  (currentStep === 1 && !canProceedStep1) || 
                  (currentStep === 2 && !canProceedStep2) ? 'disabled' : ''
                }`}
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && !canProceedStep1) || 
                  (currentStep === 2 && !canProceedStep2)
                }
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                type="submit"
                className={`action-button login ${isLoading || loginStatus === 'success' ? 'disabled' : ''}`}
                disabled={isLoading || loginStatus === 'success'}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Signing In...
                  </>
                ) : loginStatus === 'success' ? (
                  <>
                    <CheckCircle size={16} />
                    Success!
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Additional Links */}
        <div className="login-footer">
          <p className="footer-text">
            Don't have an account? <button onClick={signpage} className="link-text">Sign up here</button>
          </p>
          <p className="footer-text">
            <span className="link-text">Forgot your password?</span>
          </p>
        </div>
      </div>

      {/* Background Animation */}
      <div className="bg-animations">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>
    </div>
  );
}