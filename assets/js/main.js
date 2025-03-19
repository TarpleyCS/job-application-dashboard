// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const jobDescriptionEl = document.getElementById('job-description');
  const companyWebsiteEl = document.getElementById('company-website');
  const jobTitleEl = document.getElementById('job-title');
  const companyNameEl = document.getElementById('company-name');
  const resumeDataEl = document.getElementById('resume-data');
  const coverLetterTemplateEl = document.getElementById('cover-letter-template');
  const applicationLabelEl = document.getElementById('application-label');
  const generateButtonEl = document.getElementById('generate-button');
  const saveResumeButtonEl = document.getElementById('save-resume-button');
  const loadResumeButtonEl = document.getElementById('load-resume-button');
  const coverLetterContentEl = document.getElementById('cover-letter-content');
  const resumeSummaryContentEl = document.getElementById('resume-summary-content');
  const downloadCoverLetterEl = document.getElementById('download-cover-letter');
  const copyResumeSummaryEl = document.getElementById('copy-resume-summary');
  const saveApplicationButtonEl = document.getElementById('save-application-button');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Tab switching functionality
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update active tab content
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(`${tabName}-preview`).classList.add('active');
    });
  });

  // Save resume data
  saveResumeButtonEl.addEventListener('click', async () => {
    const resumeData = resumeDataEl.value.trim();
    if (!resumeData) {
      showNotification('Please enter resume data', 'error');
      return;
    }
    
    const success = await appDB.saveResumeData(resumeData);
    if (success) {
      showNotification('Resume data saved successfully', 'success');
    } else {
      showNotification('Failed to save resume data', 'error');
    }
  });

  // Load saved resume data
  loadResumeButtonEl.addEventListener('click', async () => {
    const resumeData = await appDB.getResumeData();
    if (resumeData) {
      resumeDataEl.value = resumeData;
      showNotification('Resume data loaded', 'success');
    } else {
      showNotification('No saved resume data found', 'warning');
    }
  });

  // Generate cover letter and resume summary
  generateButtonEl.addEventListener('click', () => {
    const jobDescription = jobDescriptionEl.value.trim();
    const companyWebsite = companyWebsiteEl.value.trim();
    const jobTitle = jobTitleEl.value.trim();
    const companyName = companyNameEl.value.trim();
    const resumeData = resumeDataEl.value.trim();
    const coverLetterTemplate = coverLetterTemplateEl.value;
    
    // Validate inputs
    if (!jobDescription || !resumeData || !jobTitle || !companyName) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Generate documents
    generateDocuments(jobDescription, companyWebsite, jobTitle, companyName, resumeData, coverLetterTemplate);
  });

  // Download cover letter as PDF
  downloadCoverLetterEl.addEventListener('click', () => {
    const coverLetterContent = coverLetterContentEl.innerHTML;
    if (!coverLetterContent || coverLetterContent.trim() === '') {
      showNotification('No cover letter to download', 'warning');
      return;
    }
    
    generatePDF(coverLetterContent, `Cover_Letter_${companyNameEl.value.replace(/\s+/g, '_')}`);
  });

  // Copy resume summary to clipboard
  copyResumeSummaryEl.addEventListener('click', () => {
    const resumeSummary = resumeSummaryContentEl.textContent;
    if (!resumeSummary || resumeSummary.trim() === '') {
      showNotification('No resume summary to copy', 'warning');
      return;
    }
    
    navigator.clipboard.writeText(resumeSummary)
      .then(() => {
        showNotification('Resume summary copied to clipboard', 'success');
      })
      .catch(() => {
        showNotification('Failed to copy resume summary', 'error');
      });
  });

  // Save application data
  saveApplicationButtonEl.addEventListener('click', async () => {
    const jobDescription = jobDescriptionEl.value.trim();
    const companyWebsite = companyWebsiteEl.value.trim();
    const jobTitle = jobTitleEl.value.trim();
    const companyName = companyNameEl.value.trim();
    const resumeData = resumeDataEl.value.trim();
    const coverLetterTemplate = coverLetterTemplateEl.value;
    const applicationLabel = applicationLabelEl.value.trim() || `${jobTitle} - ${companyName}`;
    const coverLetter = coverLetterContentEl.innerHTML;
    const resumeSummary = resumeSummaryContentEl.textContent;
    
    // Validate inputs
    if (!jobDescription || !jobTitle || !companyName) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Save application
    const applicationData = {
      label: applicationLabel,
      jobTitle,
      companyName,
      companyWebsite,
      jobDescription,
      resumeData,
      coverLetterTemplate,
      coverLetter,
      resumeSummary
    };
    
    const id = await appDB.saveApplication(applicationData);
    if (id) {
      showNotification('Application saved successfully', 'success');
    } else {
      showNotification('Failed to save application', 'error');
    }
  });

  // Function to generate documents
  function generateDocuments(jobDescription, companyWebsite, jobTitle, companyName, resumeData, templateType) {
    // Extract keywords from job description
    const keywords = window.extractKeywords(jobDescription);
    
    // Generate cover letter
    const coverLetter = generateCoverLetter(jobDescription, companyWebsite, jobTitle, companyName, resumeData, templateType, keywords);
    coverLetterContentEl.innerHTML = coverLetter;
    
    // Generate resume summary
    const resumeSummary = window.generateResumeSummary(jobDescription, resumeData, keywords);
    resumeSummaryContentEl.textContent = resumeSummary;
    
    // Show success notification
    showNotification('Documents generated successfully', 'success');
  }

  // Function to generate cover letter
  function generateCoverLetter(jobDescription, companyWebsite, jobTitle, companyName, resumeData, templateType, keywords) {
    // Get current date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Extract name from resume data (assuming first line is the name)
    const name = resumeData.split('\n')[0] || 'Your Name';
    
    // Extract contact info (assuming it's in the first few lines)
    const contactLines = resumeData.split('\n').slice(1, 5);
    const contactInfo = contactLines.join('<br>');
    
    // Use the template from templates.js
    return window.coverLetterTemplates[templateType](name, contactInfo, date, jobTitle, companyName, companyWebsite, keywords);
  }

  // Function to generate PDF
  function generatePDF(htmlContent, filename) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add HTML content to PDF
    doc.html(htmlContent, {
      callback: function(doc) {
        // Save the PDF
        doc.save(`${filename}.pdf`);
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 650
    });
  }

  // Function to show notification
  function showNotification(message, type) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
    }
    
    // Set notification content and type
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // Load saved resume data on page load
  (async function loadInitialData() {
    const resumeData = await appDB.getResumeData();
    if (resumeData) {
      resumeDataEl.value = resumeData;
    }
  })();
});
