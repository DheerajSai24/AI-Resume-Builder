import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    companyName: "",
    applyingAs: "Fresher",
    coverLetterTone: "Formal",
    jobDescription: "",
    currentResume: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  // Function to parse and format AI generated text
  const parseAIContent = (text) => {
    if (!text) return null;

    // Remove unwanted closing text patterns
    const unwantedPatterns = [
      /This detailed output will provide.*?Good luck!/gi,
      /Good luck with.*?application/gi,
      /Best wishes.*?success/gi,
      /I hope this helps.*?application/gi,
      /This should help.*?interview/gi
    ];

    let cleanedText = text;
    unwantedPatterns.forEach(pattern => {
      cleanedText = cleanedText.replace(pattern, '');
    });

    // Clean up extra whitespace and newlines
    cleanedText = cleanedText.replace(/\n\s*\n\s*\n/g, '\n\n').trim();

    const sections = [];
    const lines = cleanedText.split('\n');
    let currentSection = null;
    let currentContent = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines at the beginning or completely empty lines
      if (!trimmedLine && currentContent.length === 0) return;
      
      // Check for section headers (numbered sections like "1. Tailored Cover Letter")
      const sectionMatch = trimmedLine.match(/^(\d+\.\s*)(.*)/);
      const headerMatch = trimmedLine.match(/^(#{1,3})\s*(.*)/); // Markdown headers
      
      if (sectionMatch || headerMatch) {
        // Save previous section if exists
        if (currentSection) {
          sections.push({
            ...currentSection,
            content: currentContent.join('\n').trim()
          });
        }
        
        // Start new section
        const title = sectionMatch ? sectionMatch[2] : headerMatch[2];
        currentSection = {
          id: sections.length + 1,
          title: title,
          type: getSectionType(title)
        };
        currentContent = [];
      } else if (trimmedLine) {
        currentContent.push(line);
      } else if (currentContent.length > 0) {
        currentContent.push(''); // Preserve spacing
      }
    });

    // Add the last section
    if (currentSection) {
      sections.push({
        ...currentSection,
        content: currentContent.join('\n').trim()
      });
    }

    // If no sections found, treat entire text as one section
    if (sections.length === 0) {
      sections.push({
        id: 1,
        title: 'Generated Content',
        type: 'general',
        content: cleanedText
      });
    }

    return sections;
  };

  // Helper function to remove ** and clean text
  const cleanText = (text) => {
    return text.replace(/\*\*/g, '').trim();
  };

  // Helper function to render text with bold formatting
  const renderFormattedText = (text) => {
    if (!text.includes('**')) {
      return text;
    }
    
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
  };

  // Function to check if section should have blue heading
  const shouldHaveBlueHeading = (title, type) => {
    const lowTitle = title.toLowerCase();
    return lowTitle.includes('ats') || 
           lowTitle.includes('score') || 
           lowTitle.includes('estimate') ||
           lowTitle.includes('analysis') ||
           type === 'ats';
  };

  // Function to determine section type based on title
  const getSectionType = (title) => {
    const lowTitle = title.toLowerCase();
    if (lowTitle.includes('cover letter') || lowTitle.includes('letter')) return 'cover-letter';
    if (lowTitle.includes('resume') || lowTitle.includes('cv')) return 'resume';
    if (lowTitle.includes('keyword') || lowTitle.includes('match')) return 'keywords';
    if (lowTitle.includes('ats') || lowTitle.includes('score')) return 'ats';
    if (lowTitle.includes('analysis') || lowTitle.includes('review')) return 'analysis';
    return 'general';
  };

  // Function to get main heading class for the 4 main sections
  const getMainHeadingClass = (title, index) => {
    const lowTitle = title.toLowerCase();
    if (lowTitle.includes('cover letter') || lowTitle.includes('letter')) return 'main-heading-1';
    if (lowTitle.includes('resume') || lowTitle.includes('cv')) return 'main-heading-2';
    if (lowTitle.includes('keyword') || lowTitle.includes('match')) return 'main-heading-3';
    if (lowTitle.includes('ats') || lowTitle.includes('score')) return 'main-heading-4';
    
    // Fallback: assign based on order if specific keywords not found
    const classMap = ['main-heading-1', 'main-heading-2', 'main-heading-3', 'main-heading-4'];
    return classMap[index] || '';
  };

  // Function to check if it's a main numbered heading (1., 2., 3., 4.)
  const isMainHeading = (title) => {
    return /^[1-4]\.\s/.test(title.trim());
  };

  // Function to get section icon based on type
  const getSectionIcon = (type) => {
    switch (type) {
      case 'cover-letter': return '📝';
      case 'resume': return '📄';
      case 'keywords': return '🔍';
      case 'ats': return '📊';
      case 'analysis': return '📈';
      default: return '📋';
    }
  };

  // Function to get section badge based on type
  const getSectionBadge = (type) => {
    switch (type) {
      case 'cover-letter': return { text: 'Cover Letter', color: 'bg-amber-100 text-amber-800' };
      case 'resume': return { text: 'Resume', color: 'bg-blue-100 text-blue-800' };
      case 'keywords': return { text: 'Keywords', color: 'bg-green-100 text-green-800' };
      case 'ats': return { text: 'ATS Analysis', color: 'bg-purple-100 text-purple-800' };
      case 'analysis': return { text: 'Analysis', color: 'bg-red-100 text-red-800' };
      default: return { text: 'Content', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // call at top
    console.log("Form submitted!") // Debug log
    console.log("Form data:", formData) // Debug log
    
    setIsLoading(true)
    setResult(null)

    const prompt = ` You are a professional career coach and resume optimization expert. 
Your task is to generate a personalized cover letter, improve the resume content, 
and provide an ATS (Applicant Tracking System) analysis.

Inputs:
Company Name: ${formData.companyName}
Experience Level: ${formData.applyingAs}  (Fresher / Experienced)
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume} (If empty, assume no resume exists and create a draft)
Preferred Tone: ${formData.coverLetterTone}

Output (format clearly in sections):

1. Tailored Cover Letter  
Write a professional cover letter addressed to ${formData.companyName}.  
Use the specified tone: ${formData.coverLetterTone}.  
Highlight relevant skills and experiences based on the job description.  

2. Updated Resume Content  
Suggest optimized resume summary, bullet points, and skills tailored to ${formData.jobDescription}.  
Ensure the content is concise, achievement-focused, and ATS-friendly.  

3. Keyword Match Analysis  
Extract the most important keywords from the job description.  
Check if they exist in the provided resume (if given).  
List missing keywords that should be added.  

4. ATS Score Estimate (0–100)  
Provide a rough ATS match score for the current resume against the job description.  
Explain the reasoning briefly (e.g., missing keywords, formatting issues, irrelevant content).  

Ensure the response is structured, clear, and easy to display in a React app.`

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("X-goog-api-key", API_KEY)

    const raw = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt 
            }
          ]
        }
      ]
    })

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    }

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        requestOptions
      )
      const result = await response.json()
      console.log("API Result:", result)
      
      // Check if the response has the expected structure
      if (result.candidates && result.candidates[0] && result.candidates[0].content) {
        const generatedText = result.candidates[0].content.parts[0].text
        console.log("Generated Text:", generatedText)
        setResult(generatedText)
      } else {
        console.log("Unexpected response structure:", result)
        setResult("Error: Unexpected response from API")
      }
    } catch (error) {
      console.error("Error:", error)
      setResult("Error: Failed to generate content")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="hero-badge">
            🤖 AI-Powered • ✨ Professional • 🚀 Fast
          </div>
          <h1 className="hero-title">AI Resume Builder</h1>
          <p className="hero-subtitle">
            Create professional resumes and cover letters with the power of artificial intelligence
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Form Card */}
              <div className="form-card">
                <div className="form-header">
                  <h2 className="form-title">📝 Build Your Perfect Resume</h2>
                  <p className="form-description">
                    Fill in the details below and let our AI create a tailored resume and cover letter for you
                  </p>
                </div>
                
                <div className="form-body">
                  <form onSubmit={handleSubmit}>
                    {/* Company Name */}
                    <div className="form-group">
                      <label className="form-label">🏢 Company Name</label>
                      <input
                        type="text"
                        className="form-control-modern"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter the company you're applying to"
                      />
                      <div className="form-help">The company you are applying to</div>
                    </div>

                    {/* Experience Level */}
                    <div className="form-group">
                      <label className="form-label">👨‍💼 Experience Level</label>
                      <select
                        className="form-select-modern"
                        name="applyingAs"
                        value={formData.applyingAs}
                        onChange={handleChange}
                      >
                        <option value="Fresher">🌱 Fresher (0-2 years)</option>
                        <option value="Experienced">🚀 Experienced (2+ years)</option>
                      </select>
                      <div className="form-help">Your current experience level</div>
                    </div>

                    {/* Cover Letter Tone */}
                    <div className="form-group">
                      <label className="form-label">🎭 Cover Letter Tone</label>
                      <select
                        className="form-select-modern"
                        name="coverLetterTone"
                        value={formData.coverLetterTone}
                        onChange={handleChange}
                      >
                        <option value="Formal">📋 Formal & Professional</option>
                        <option value="Informal">💬 Friendly & Approachable</option>
                        <option value="Casual">😊 Casual & Conversational</option>
                      </select>
                      <div className="form-help">Choose the tone for your cover letter</div>
                    </div>

                    {/* Job Description */}
                    <div className="form-group">
                      <label className="form-label">📋 Job Description</label>
                      <textarea
                        className="form-control-modern"
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Paste the job description here..."
                      ></textarea>
                      <div className="form-help">Copy and paste the complete job description</div>
                    </div>

                    {/* Current Resume */}
                    <div className="form-group">
                      <label className="form-label">📄 Current Resume</label>
                      <textarea
                        className="form-control-modern"
                        name="currentResume"
                        value={formData.currentResume}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Paste your current resume content here..."
                      ></textarea>
                      <div className="form-help">Your existing resume content (optional)</div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn-modern" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <div className="loading-spinner"></div>
                          Generating AI Content...
                        </>
                      ) : (
                        "✨ Generate AI Resume & Cover Letter"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Generated Content Section */}
      {result && (
        <div className="main-content" style={{ paddingTop: '2rem' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="ai-content-card">
                  <div className="ai-content-header">
                    <h3 className="ai-content-title">
                      <span className="ai-icon">🤖</span>
                      AI Generated Content
                    </h3>
                  </div>
                  <div className="ai-content-body">
                    {(() => {
                      const parsedContent = parseAIContent(result);
                      return parsedContent ? (
                        <div className="response-sections">
                          {parsedContent.map((section, index) => {
                            return (
                              <div key={section.id} className="response-section">
                                <h3 className="section-title">{cleanText(section.title)}</h3>
                                <div className="section-content">
                                  {section.content.split('\n').map((line, lineIndex) => {
                                  const trimmedLine = line.trim();
                                  
                                  if (!trimmedLine) return <br key={lineIndex} />;
                                  
                                  // Handle numbered items (1., 2., 3., etc.) - Make them BLUE
                                  const numberedMatch = trimmedLine.match(/^(\d+\.)\s*(.*)/);
                                  if (numberedMatch) {
                                    return (
                                      <p key={lineIndex} className="numbered-text-blue">
                                        {renderFormattedText(trimmedLine)}
                                      </p>
                                    );
                                  }
                                  
                                  // Handle bullet points
                                  if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
                                    const cleanBullet = cleanText(trimmedLine.substring(1));
                                    return (
                                      <div key={lineIndex} className="bullet-point">
                                        {renderFormattedText(cleanBullet)}
                                      </div>
                                    );
                                  }
                                  
                                  // Handle sub-headers (lines ending with :)
                                  if (trimmedLine.endsWith(':')) {
                                    return <h4 key={lineIndex} className="sub-header">{cleanText(trimmedLine)}</h4>;
                                  }
                                  
                                  // Regular paragraph with bold text support
                                  return <p key={lineIndex}>{renderFormattedText(trimmedLine)}</p>;
                                })}
                              </div>
                            </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="generated-text">
                          {result}
                        </div>
                      );
                    })()}
                    <div className="action-buttons">
                      <button 
                        className="btn-secondary"
                        onClick={() => navigator.clipboard.writeText(result)}
                      >
                        📋 Copy to Clipboard
                      </button>
                      <button 
                        className="btn-outline"
                        onClick={() => setResult(null)}
                      >
                        🗑️ Clear Results
                      </button>
                      <button 
                        className="btn-outline"
                        onClick={() => window.print()}
                      >
                        �️ Print
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Section */}
      {isLoading && (
        <div className="main-content" style={{ paddingTop: '2rem' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="loading-card">
                  <div className="loading-spinner-large"></div>
                  <h4 className="loading-title">🤖 AI is Working...</h4>
                  <p className="loading-subtitle">
                    Crafting your perfect resume and cover letter using advanced AI technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
