import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Code, Download, Save, Sparkles, Edit3, FileText } from 'lucide-react';

const ResumeFile = () => {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    degree: '',
    institution: '',
    year: '',
    skillname: '',
    experience: '',
    projects: []
  });

  const [projectInput, setProjectInput] = useState('');
  const [aiGeneratedText, setAiGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addProject = () => {
    if (projectInput.trim()) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, projectInput.trim()]
      }));
      setProjectInput('');
    }
  };

  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const generateAIText = async () => {
    setIsGenerating(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.jobTitle || !formData.skillname || !formData.experience) {
        alert('Please fill in all required fields: Name, Job Title, Skills, and Experience');
        setIsGenerating(false);
        return;
      }

      const response = await fetch('http://localhost:5000/docs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if you have authentication
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        

          
        },
        body: JSON.stringify({
          name: formData.name,
          jobTitle: formData.jobTitle,
          degree: formData.degree,
          institution: formData.institution,
          year: formData.year,
          skillname: formData.skillname,
          experience: formData.experience,
          projects: formData.projects
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setAiGeneratedText(data.newDoc.finalContent);
        setShowPreview(true);
        // Store the document ID for future updates
        setDocumentId(data.newDoc._id);
      } else {
        throw new Error(data.message || 'Failed to generate resume');
      }
    } catch (error) {
      console.error('Error generating AI text:', error);
      alert('Error generating resume: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateDocument = async () => {
    if (!documentId) {
      alert('No document to update. Please generate a resume first.');
      return;
    }

    setIsUpdating(true);
    
    try {
      const response = await fetch(`http://localhost:5000/docs/${documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if you have authentication
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          finalContent: aiGeneratedText
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Resume updated successfully!');
      } else {
        throw new Error(data.message || 'Failed to update resume');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Error updating resume: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const fetchUserDocuments = async () => {
    try {
      const response = await fetch('http://localhost:5000/docs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if you have authentication
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        return data.fetchDocs;
      } else {
        throw new Error(data.message || 'Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };

  const downloadPDF = () => {
    // Create a printable version of the resume
    const printContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb; margin-bottom: 10px;">${formData.name}</h1>
        <h2 style="color: #64748b; margin-bottom: 20px;">${formData.jobTitle}</h2>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Education</h3>
          <p><strong>${formData.degree}</strong><br>
          ${formData.institution} | ${formData.year}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Skills</h3>
          <p>${formData.skillname}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Experience</h3>
          <p>${formData.experience}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Projects</h3>
          <ul>
            ${formData.projects.map(project => `<li>${project}</li>`).join('')}
          </ul>
        </div>
        
        <div style="margin-top: 30px;">
          <h3 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">AI Generated Summary</h3>
          <div style="white-space: pre-wrap; line-height: 1.6;">${aiGeneratedText}</div>
        </div>
      </div>
    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${formData.name}</title>
          <style>
            body { margin: 0; padding: 20px; }
            @media print { 
              body { margin: 0; padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent}
          <div class="no-print" style="text-align: center; margin-top: 30px;">
            <button onclick="window.print()" style="background: #3b82f6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Download PDF</button>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
                <p className="text-gray-600">Create your professional resume with AI assistance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome back!</span>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Edit3 className="h-5 w-5 mr-2 text-blue-600" />
                Resume Information
              </h2>
              <p className="text-gray-600 mt-1">Fill in your details to generate your resume</p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-700 font-medium">
                <User className="h-4 w-4" />
                <span>Personal Information</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Full Stack Developer"
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-700 font-medium">
                <GraduationCap className="h-4 w-4" />
                <span>Education</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. B.Tech in Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 2025"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. XYZ Institute of Technology"
                />
              </div>
            </div>

            {/* Skills & Experience */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-700 font-medium">
                <Code className="h-4 w-4" />
                <span>Skills & Experience</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <input
                  type="text"
                  name="skillname"
                  value={formData.skillname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 1 year internship in MERN projects"
                />
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-700 font-medium">
                <Briefcase className="h-4 w-4" />
                <span>Projects</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={projectInput}
                  onChange={(e) => setProjectInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addProject()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a project"
                />
                <button
                  onClick={addProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.projects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-700">{project}</span>
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={generateAIText}
                disabled={isGenerating || !formData.name || !formData.jobTitle || !formData.skillname || !formData.experience}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate AI Resume </span>
                  </>
                )}
              </button>
              {(!formData.name || !formData.jobTitle || !formData.skillname || !formData.experience) && (
                <p className="text-red-500 text-sm mt-2">
                  Please fill in all required fields: Name, Job Title, Skills, and Experience
                </p>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Resume Preview</h2>
              <p className="text-gray-600 mt-1">Review and edit your generated resume</p>
            </div>

            {!showPreview ? (
              <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                <FileText className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg mb-2">No resume generated yet</p>
                <p className="text-sm">Fill in your information and click "Generate AI Resume"</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">AI Generated Content</h3>
                  <textarea
                    value={aiGeneratedText}
                    onChange={(e) => setAiGeneratedText(e.target.value)}
                    rows="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="AI generated resume content will appear here..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={updateDocument}
                    disabled={isUpdating || !documentId}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Update Resume</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadPDF}
                    disabled={!aiGeneratedText}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFile;