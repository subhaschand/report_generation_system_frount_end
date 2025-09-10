import { useState } from "react";
import './HomePage.css';
import { Upload, University, BookOpen, FileText, Sun, Moon } from "lucide-react";

export default function HomePage() {
  const [colorTheme, setColorTheme] = useState("blue");
  const [darkMode, setDarkMode] = useState(false);

  // Color theme configurations
  const colorThemes = {
    blue: {
      light: {
        bg: "bg-blue-50",
        title: "text-blue-700",
        border: "border-blue-300",
        button: "bg-blue-600 hover:bg-blue-700",
        focus: "focus:border-blue-500 focus:ring-blue-200"
      },
      dark: {
        bg: "bg-gray-900",
        title: "text-blue-400",
        border: "border-blue-600",
        button: "bg-blue-600 hover:bg-blue-500",
        focus: "focus:border-blue-400 focus:ring-blue-800"
      }
    },
    green: {
      light: {
        bg: "bg-green-50",
        title: "text-green-700",
        border: "border-green-300",
        button: "bg-green-600 hover:bg-green-700",
        focus: "focus:border-green-500 focus:ring-green-200"
      },
      dark: {
        bg: "bg-gray-900",
        title: "text-green-400",
        border: "border-green-600",
        button: "bg-green-600 hover:bg-green-500",
        focus: "focus:border-green-400 focus:ring-green-800"
      }
    },
    purple: {
      light: {
        bg: "bg-purple-50",
        title: "text-purple-700",
        border: "border-purple-300",
        button: "bg-purple-600 hover:bg-purple-700",
        focus: "focus:border-purple-500 focus:ring-purple-200"
      },
      dark: {
        bg: "bg-gray-900",
        title: "text-purple-400",
        border: "border-purple-600",
        button: "bg-purple-600 hover:bg-purple-500",
        focus: "focus:border-purple-400 focus:ring-purple-800"
      }
    },
    red: {
      light: {
        bg: "bg-red-50",
        title: "text-red-700",
        border: "border-red-300",
        button: "bg-red-600 hover:bg-red-700",
        focus: "focus:border-red-500 focus:ring-red-200"
      },
      dark: {
        bg: "bg-gray-900",
        title: "text-red-400",
        border: "border-red-600",
        button: "bg-red-600 hover:bg-red-500",
        focus: "focus:border-red-400 focus:ring-red-800"
      }
    }
  };

  const currentTheme = colorThemes[colorTheme][darkMode ? 'dark' : 'light'];
  const textColors = darkMode ? 'text-gray-300' : 'text-gray-600';
  const labelColors = darkMode ? 'text-gray-200' : 'text-gray-700';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-white';
  const inputText = darkMode ? 'text-white' : 'text-gray-900';
  const iconColors = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-300`} style={{ backgroundColor:'lightblue' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Header with Theme Toggle */}
        <header style={{ width: '100%', maxWidth: '56rem', textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`${
              darkMode 
                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            } transition-all duration-300`}
            style={{ 
              position: 'absolute', 
              backgroundColor:'white',
              color:'blue',
              top: 0, 
              right: 0, 
              padding: '12px', 
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <h1 className={`${currentTheme.title} transition-colors duration-300`} style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '8px' }}>
            📑 Automatic Report Generation System
          </h1>
          <p className={`${textColors} transition-colors duration-300`} style={{ marginTop: '8px' }}>
            Upload your project details, choose college format, and generate your report instantly.
          </p>
        </header>

        {/* Form Section */}
        <div 
          className={`${cardBg} transition-colors duration-300`}
          style={{ 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
            borderRadius: '16px', 
            backgroundColor:'rgba(196, 135, 135, 0.25)',
            padding: '32px', 
            width: '100%', 
            maxWidth: '32rem'
          }}
        >
          {/* Project Title */}
          <div style={{ marginBottom: '24px' }}>
            <label className={`${labelColors} transition-colors duration-300`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', marginBottom: '8px', fontSize:'1.5rem'}}>
              <FileText size={20} className={iconColors} />
              Project Title
            </label>
            <input
              type="text"
              placeholder="Enter your project title"
              className={`${currentTheme.border} ${inputBg} ${inputText} ${currentTheme.focus} transition-all duration-200`}
              style={{ 
                width: '100%', 
                border: '1px solid', 
                borderRadius: '8px', 
                padding: '12px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* File Upload */}
          <div style={{ marginBottom: '24px' }}>
            <label className={`${labelColors} transition-colors duration-300`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', marginBottom: '8px',fontSize:'1.5rem' }}>
              <Upload size={20} className={iconColors} />
              Upload Abstract File (Docs/PDF)
            </label>
            <input
              type="file"
              accept=".doc,.docx,.pdf"
              className={`${currentTheme.border} ${inputBg} ${inputText} ${currentTheme.focus} transition-all duration-200`}
              style={{ 
                width: '100%', 
                border: '1px solid', 
                borderRadius: '8px', 
                padding: '12px',
                fontSize: '16px',
                backgroundColor:'white'
              }}
            />
          </div>

          {/* College Format Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label className={`${labelColors} transition-colors duration-300`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', marginBottom: '8px',fontSize:'1.5rem' }}>
              <University size={20} className={iconColors} />
              Select College Report Format
            </label>
            <select
              className={`${currentTheme.border} ${inputBg} ${inputText} ${currentTheme.focus} transition-all duration-200`}
              style={{ 
                width: '100%', 
                border: '1px solid', 
                borderRadius: '8px', 
                padding: '12px',
                fontSize: '16px'
              }}
            >
              <option value="">-- Select Format --</option>
              <option value="collegeA">College A Format</option>
              <option value="collegeB">College B Format</option>
              <option value="collegeC">College C Format</option>
            </select>
          </div>

          {/* Number of Pages */}
          <div style={{ marginBottom: '24px' }}>
            <label className={`${labelColors} transition-colors duration-300`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', marginBottom: '8px',fontSize:'1.5rem' }}>
              <BookOpen size={20} className={iconColors} />
              Number of Pages
            </label>
            <input
              type="number"
              min="1"
              max="200"
              placeholder="Enter number of pages"
              className={`${currentTheme.border} ${inputBg} ${inputText} ${currentTheme.focus} transition-all duration-200`}
              style={{ 
                width: '100%', 
                border: '1px solid', 
                borderRadius: '8px', 
                padding: '12px',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Generate Report Button */}
          <button
            className={`${currentTheme.button} transition-all duration-300`}
            style={{ 
              width: '100%', 
              color: 'white', 
              fontWeight: '600', 
              backgroundColor:'green',
              padding: '12px', 
              borderRadius: '12px', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Generate Report
          </button>
        </div>

        {/* Theme Selectors */}
        <footer style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          {/* Color Theme Selector */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {['blue', 'green', 'purple', 'red'].map((color) => (
              <button
                key={color}
                onClick={() => setColorTheme(color)}
                className={`bg-${color}-500 transition-transform duration-200 hover:scale-110`}
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  border: colorTheme === color ? '3px solid rgba(0,0,0,0.3)' : '2px solid white',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transform: colorTheme === color ? 'scale(1.1)' : 'scale(1)'
                }}
              />
            ))}
          </div>

          {/* Mode Indicator */}
          <p className={`${textColors} transition-colors duration-300`} style={{ textAlign: 'center', fontSize: '14px' }}>
            {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'} • {colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1)} Theme
          </p>
        </footer>
      </div>
    </div>
  );
}