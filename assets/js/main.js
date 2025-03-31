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
  const scrapeButton = document.getElementById('');

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
  // uses this data for last lines of text
function generateCoverLetter(jobDescription, companyWebsite, jobTitle, companyName, resumeData, templateType, keywords) {
  // Get current date
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Extract name and contact info from resume data
  const resumeLines = resumeData.split('\n');
  const name = resumeLines[0] || 'Your Name';
  
  // Extract specific contact details
  const userEmail = resumeLines.find(line => line.includes('@')) || 'your.email@example.com';
  const userPhone = resumeLines.find(line => line.match(/\d{3}[-\.\s]?\d{3}[-\.\s]?\d{4}/)) || '(407)256-8802';
  const userAddress = resumeLines.find(line => line.includes('Street') || line.includes('Ave') || line.includes('Road') || line.includes(',')) || 'Denver, Colorado';
  const userLinkedIn = resumeLines.find(line => line.toLowerCase().includes('linkedin')) || 'linkedin/in/alex-tarpley/';
  
    // Get the content from the appropriate template
    let bodyContent;
    if (templateType !== "ai") {
      bodyContent = window.coverLetterTemplates(name, '', date, jobTitle, companyName, companyWebsite, keywords);
    } else {
      bodyContent = window.aiTemplate(name, '', date, jobTitle, companyName, companyWebsite, keywords);
    }
  

  
  // Format the complete cover letter with proper structure (MSS style)
  const formattedCoverLetter = `
    <div class="cover-letter">
      <!-- Header with contact information -->
      <div class="header" style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div style="text-align: left;">
          <h1 style="font-size: 18px; font-weight: bold; margin-bottom: 0; text-transform: uppercase;">${name}</h1>
        </div>
        <div style="text-align: right;">
          <p style="margin: 0; font-size: 12px;">${userAddress} | ${userEmail} | ${userPhone} | ${userLinkedIn}</p>
        </div>
      </div>
      
      <!-- Horizontal line -->
      <hr style="border: 0.5px solid #000; margin: 5px 0 20px 0;">
      
      <!-- Company Address -->
      <div class="recipient" style="margin-bottom: 5px;">
        <p style="margin: 2px 0;">${companyName}</p>
        <p style="margin: 2px 0;">Boulder, CO</p>
      </div>
      
      <!-- Date -->
      <div class="date" style="margin-bottom: 20px;">
        <p style="margin: 2px 0;">${date}</p>
      </div>
      
      <!-- Salutation -->
      <div class="salutation" style="margin-bottom: 20px;">
        <p>Dear ${companyName} Hiring Team,</p>
      </div>
      
      <!-- Body paragraphs -->
      <div class="body" style="margin-bottom: 20px; text-align: justify;">
        ${bodyContent}
      </div>
      
      <!-- Closing -->
      <div class="closing" style="margin-top: 20px;">
        <p>Sincerely,</p>
        <div class="signature" style="margin-top: 30px;">
          <p>${name}</p>
          <p>${userPhone}</p>
          <p>${userEmail}</p>
        </div>
      </div>
    </div>
  `;
  
  return formattedCoverLetter;
}

// Function to generate PDF 
// uses this data for header lines
function generatePDF(htmlContent, filename) {
  // Extract name and contact info from resume data
  const resumeData = document.getElementById('resume-data').value.trim();
  const resumeLines = resumeData.split('\n');
  const userName = resumeLines[0] || 'Your Name';
  const userEmail = resumeLines.find(line => line.includes('@')) || 'your.email@example.com';
  const userPhone = resumeLines.find(line => line.match(/\d{3}[-\.\s]?\d{3}[-\.\s]?\d{4}/)) || '(407)256-8802';
  const userAddress = resumeLines.find(line => line.includes('Street') || line.includes('Ave') || line.includes('Road') || line.includes(',')) || 'Denver, Colorado';
  const userLinkedIn = resumeLines.find(line => line.toLowerCase().includes('linkedin')) || 'LinkedIn';
  
  // Get company name and job title
  const companyName = document.getElementById('company-name').value;
  const jobTitle = document.getElementById('job-title').value;
  
  // Format the date
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  // Create PDF with jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Document settings
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const lineHeight = 7;
  
  // --- HEADER SECTION (MSS Format) ---
  
  // Add name header in bold
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(userName.toUpperCase(), margin, 20);
  
  // Add contact info right-aligned
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const contactInfo = `${userAddress} | ${userEmail} | ${userPhone} | ${userLinkedIn}`;
  const contactWidth = doc.getStringUnitWidth(contactInfo) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  doc.text(contactInfo, pageWidth - margin - contactWidth, 20);
  
  // Add horizontal divider line
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, 25, pageWidth - margin, 25);
  
  // Reset font for content
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  
  // Company address
  doc.text(`${companyName}`, margin, 35);

  
  // Date
  doc.text(formattedDate, margin, 52);
  
  // Salutation
  doc.text(`Dear ${companyName} Hiring Team,`, margin, 65);
  
  // Get the cover letter content as text
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Extract paragraphs from the body section
  const bodyParagraphs = [];
  const paragraphs = tempDiv.querySelectorAll('.body p');
  paragraphs.forEach(p => {
    bodyParagraphs.push(p.textContent.trim());
  });
  
  // If no paragraphs found in the structured way, try to extract all paragraphs
  if (bodyParagraphs.length === 0) {
    const allParagraphs = tempDiv.querySelectorAll('p');
    // Skip the first few paragraphs (likely header) and last paragraph (likely signature)
    for (let i = 4; i < allParagraphs.length - 2; i++) {
      bodyParagraphs.push(allParagraphs[i].textContent.trim());
    }
  }
  
  // If still no paragraphs, use the entire text content
  if (bodyParagraphs.length === 0) {
    bodyParagraphs.push(tempDiv.textContent.trim());
  }
  
  // Add paragraphs to PDF
  let yPosition = 75;
  bodyParagraphs.forEach(paragraph => {
    if (paragraph.trim() === '') return;
    
    // Add indentation to paragraphs
    const lines = doc.splitTextToSize(paragraph, 170);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * 7 + 5;
  });
  
  // Closing
  doc.text('Sincerely,', margin, yPosition + 10);
  doc.text(userName, margin, yPosition + 30);
  doc.text(userPhone, margin, yPosition + 37);
  doc.text(userEmail, margin, yPosition + 44);
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
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
