
// Cover letter templates based on user examples
const coverLetterTemplates = {
  // General template for most job types
  general: function(name, contactInfo, date, jobTitle, companyName, companyWebsite, keywords) {
    return `
      <p>I am writing to express my interest in the ${jobTitle} position at ${companyName}. As a professional with experience in ${keywords.slice(0, 3).join(', ')}, I am excited about the opportunity to contribute to your team.</p>
      
      <p>My professional experience has equipped me with relevant skills that transfer well to this role.I've designed and implemented solutions that optimize complex systems,  created data pipelines, and built tools that accelerate decision-making processes.   My work demonstrates my ability to create solutions that address specific operational   challenges—a skill I believe would be valuable in this position.</p>
     
      <p>I have extensive experience with many of the technical requirements listed in your job description. I've worked with ${keywords.slice(3, 6).join(', ')}, and developed applications to automate processes. Additionally, my experience has given me practical knowledge in deploying solutions that meet specific operational needs.</p>
      
      <p>What particularly excites me about this position is the opportunity to work at ${companyName},  contributing to innovative approaches that make a meaningful difference. I'm drawn to your company's vision and the chance to be part of your continued success.</p>
      
      <p>Thank you for considering my application. I look forward to the opportunity to discuss how my 
      background could contribute to ${companyName}'s continued success.</p>
    `;
  },
  
  // Technical template for software/engineering roles
  technical: function(name, contactInfo, date, jobTitle, companyName, companyWebsite, keywords) {
    const techKeywords = keywords.filter(keyword => 
      ['software', 'development', 'engineering', 'python', 'java', 'c++', 'javascript', 'html', 'css', 
       'react', 'vue', 'azure', 'database', 'sql', 'git', 'docker', 'algorithms', 'data structures',
       'embedded', 'systems', 'architecture', 'design', 'automation', 'optimization'].includes(keyword.toLowerCase())
    );
    
    const keywordsList = techKeywords.length > 0 ? techKeywords.join(', ') : 'software development, system architecture design, and process optimization';
    
    return `
      <p>I am writing to express my interest in the ${jobTitle} position at ${companyName}.
       As a software engineer with experience in system architecture design and implementation, I am excited about the opportunity to contribute to your technical initiatives.</p>
      
      <p>My professional experience has equipped me with relevant skills in ${keywordsList}.
       I've designed and implemented software solutions that optimize complex operational systems, created data pipelines, and built visualization tools that accelerate decision-making processes. My work developing specialized applications demonstrates my ability to create software that addresses specific operational challenges—a skill I believe would be valuable at ${companyName}.</p>
      
      <p>I have extensive experience with many of the technical requirements listed in your 
      job description. I've worked with relational databases, implemented version control using Git, 
      and developed scripts to automate processes. Additionally, my experience creating visualization dashboards has given me practical knowledge in deploying software solutions that meet specific operational needs.</p>
      
      <p>What particularly excites me about this position is the opportunity to work at the intersection of software and business operations, providing crucial technical solutions that drive efficiency and innovation. I'm drawn to ${companyName}'s approach and the chance to contribute to systems that make a meaningful difference.</p>
      
      <p>Thank you for considering my application. I look forward to the opportunity to discuss how my technical background could contribute to ${companyName}'s continued success.</p>
    `;
  },
  
  // Creative template for design/marketing roles
  creative: function(name, contactInfo, date, jobTitle, companyName, companyWebsite, keywords) {
    const creativeKeywords = keywords.filter(keyword => 
      ['creative', 'design', 'innovation', 'content', 'writing', 'storytelling', 'branding', 'marketing',
       'social media', 'communication', 'visual', 'artistic', 'multimedia', 'graphic', 'ui/ux'].includes(keyword.toLowerCase())
    );
    
    const keywordsList = creativeKeywords.length > 0 ? creativeKeywords.join(', ') : 'creative design, innovation, and communication';
    
    return `
      <p>When I discovered the ${jobTitle} opportunity at ${companyName}, I was immediately inspired. Your company's innovative approach to design and creative solutions resonates deeply with my own creative philosophy.</p>
      
      <p>My journey in the creative field has equipped me with skills in ${keywordsList}. I thrive in collaborative environments where creativity and strategic thinking intersect to produce compelling and effective results. My experience has taught me how to translate complex ideas into clear, engaging communications that resonate with diverse audiences.</p>
      
      <p>What excites me most about ${companyName} is your commitment to pushing creative boundaries while delivering meaningful experiences to your audience. I am eager tO contribute my unique perspective and creative problem-solving abilities to your team, helping to further strengthen your brand's presence and impact.</p>
      
      <p>I believe that great creative work comes from a combination of bold ideas, technical skill, and a deep understanding of the audience. This approach has guided my work throughout my career, and I'm excited about the possibility of bringing this mindset to ${companyName}.</p>
      
      <p>I would love the opportunity to discuss how my creative vision aligns with your company's goals. Thank you for considering my application.</p>
    `;
  },
  
  // Management template for leadership roles
  management: function(name, contactInfo, date, jobTitle, companyName, companyWebsite, keywords) {
    const managementKeywords = keywords.filter(keyword => 
      ['leadership', 'management', 'strategy', 'team', 'project management', 'operations', 'budget',
       'planning', 'organization', 'communication', 'decision-making', 'problem-solving', 'negotiation'].includes(keyword.toLowerCase())
    );
    
    const keywordsList = managementKeywords.length > 0 ? managementKeywords.join(', ') : 'leadership, strategic planning, and team management';
    
    return `
      <p>I am writing to express my interest in the ${jobTitle} position at ${companyName}. With my proven track record in leadership and management, I am confident in my ability to make significant contributions to your organization.</p>
      
      <p>Throughout my career, I have developed strong capabilities in ${keywordsList}. I have successfully led teams through complex projects, implemented strategic initiatives, and consistently delivered results that exceed expectations. My approach to leadership focuses on clear communication, strategic thinking, and empowering team members to reach their full potential.</p>
      
      <p>What particularly attracts me to ${companyName} is your reputation for excellence and innovation in the industry. I am impressed by your company's vision and would welcome the opportunity to help drive your continued success through effective leadership and operational excellence.</p>
      
      <p>I believe my management philosophy aligns well with ${companyName}'s values and would enable me to effectively lead within your organization. My experience has taught me the importance of balancing strategic vision with practical execution, a skill that I would bring to this role.</p>
      
      <p>I look forward to the possibility of discussing how my leadership experience and management approach could benefit ${companyName}. Thank you for considering my application.</p>
    `;
  }
};

// Resume summary generator based on user examples
function generateResumeSummary(jobDescription, resumeData, keywords) {
  // Create a targeted summary based on job description and keywords
  const keywordsText = keywords.length > 0 
    ? `with expertise in ${keywords.slice(0, 5).join(', ')}` 
    : 'with a diverse skill set and proven experience';
  
  // Extract job type/industry from job description
  let jobType = 'professional';
  let industryFocus = '';
  let keySkills = '';
  
  if (jobDescription.toLowerCase().includes('software') || 
      jobDescription.toLowerCase().includes('developer') || 
      jobDescription.toLowerCase().includes('engineer') || 
      jobDescription.toLowerCase().includes('programming')) {
    jobType = 'software engineering';
    keySkills = 'designing, developing, and implementing scalable software solutions';
    
    if (jobDescription.toLowerCase().includes('full-stack') || 
        jobDescription.toLowerCase().includes('fullstack')) {
      industryFocus = 'full-stack development';
    } else if (jobDescription.toLowerCase().includes('front') || 
               jobDescription.toLowerCase().includes('ui') || 
               jobDescription.toLowerCase().includes('user interface')) {
      industryFocus = 'frontend development';
    } else if (jobDescription.toLowerCase().includes('back') || 
               jobDescription.toLowerCase().includes('server')) {
      industryFocus = 'backend development';
    } else if (jobDescription.toLowerCase().includes('data') || 
               jobDescription.toLowerCase().includes('analytics')) {
      industryFocus = 'data engineering';
    } else if (jobDescription.toLowerCase().includes('embedded') || 
               jobDescription.toLowerCase().includes('hardware')) {
      industryFocus = 'embedded systems';
    }
  } else if (jobDescription.toLowerCase().includes('design') || 
             jobDescription.toLowerCase().includes('creative') || 
             jobDescription.toLowerCase().includes('art')) {
    jobType = 'design';
    keySkills = 'creating compelling visual solutions and user experiences';
    
    if (jobDescription.toLowerCase().includes('ui') || 
        jobDescription.toLowerCase().includes('ux') || 
        jobDescription.toLowerCase().includes('user experience')) {
      industryFocus = 'UI/UX design';
    } else if (jobDescription.toLowerCase().includes('graphic')) {
      industryFocus = 'graphic design';
    } else if (jobDescription.toLowerCase().includes('product')) {
      industryFocus = 'product design';
    }
  } else if (jobDescription.toLowerCase().includes('manage') || 
             jobDescription.toLowerCase().includes('director') || 
             jobDescription.toLowerCase().includes('lead')) {
    jobType = 'management';
    keySkills = 'leading teams and driving strategic initiatives';
    
    if (jobDescription.toLowerCase().includes('project')) {
      industryFocus = 'project management';
    } else if (jobDescription.toLowerCase().includes('product')) {
      industryFocus = 'product management';
    } else if (jobDescription.toLowerCase().includes('operations')) {
      industryFocus = 'operations management';
    }
  } else if (jobDescription.toLowerCase().includes('market') || 
             jobDescription.toLowerCase().includes('sales')) {
    jobType = 'marketing and sales';
    keySkills = 'developing strategies and driving business growth';
    
    if (jobDescription.toLowerCase().includes('digital')) {
      industryFocus = 'digital marketing';
    } else if (jobDescription.toLowerCase().includes('content')) {
      industryFocus = 'content marketing';
    } else if (jobDescription.toLowerCase().includes('sales')) {
      industryFocus = 'sales';
    }
  }
  
  const industryText = industryFocus ? ` specializing in ${industryFocus}` : '';
  
  return `Dynamic ${jobType} professional${industryText} ${keywordsText}. Experienced in ${keySkills} that drive significant improvements in accuracy, speed, and decision-making. Adept at creating robust applications and systems that address specific operational challenges while optimizing complex processes. Combines technical expertise with strong communication skills to collaborate effectively with cross-functional teams and deliver solutions that meet business objectives.`;
}

// Function to extract keywords from job description
function extractKeywords(jobDescription) {
  // Common technical skills and keywords
  const commonKeywords = [
    // Technical skills
    'javascript', 'python', 'java', 'c++', 'ruby', 'php', 'html', 'css', 'react', 'angular', 'vue', 
    'node', 'express', 'django', 'flask', 'spring', 'rails', 'sql', 'nosql', 'mongodb', 'postgresql', 
    'mysql', 'oracle', 'aws', 'azure', 'gcp', 'cloud', 'docker', 'kubernetes', 'ci/cd', 'git', 
    'algorithms', 'data structures', 'api', 'rest', 'graphql', 'microservices', 'serverless',
    
    // Software development
    'software', 'development', 'engineering', 'programming', 'coding', 'testing', 'debugging',
    'full-stack', 'frontend', 'backend', 'web', 'mobile', 'desktop', 'embedded', 'systems',
    'architecture', 'design', 'implementation', 'deployment', 'maintenance', 'optimization',
    
    // Data
    'data', 'analytics', 'visualization', 'machine learning', 'ai', 'artificial intelligence',
    'big data', 'data science', 'data engineering', 'etl', 'business intelligence', 'reporting',
    
    // Design
    'design', 'ui', 'ux', 'user experience', 'user interface', 'graphic', 'visual', 'creative',
    'wireframing', 'prototyping', 'mockups', 'figma', 'sketch', 'adobe', 'photoshop', 'illustrator',
    
    // Management
    'management', 'leadership', 'strategy', 'planning', 'organization', 'coordination',
    'project management', 'product management', 'operations', 'team', 'supervision',
    
    // Soft skills
    'communication', 'teamwork', 'collaboration', 'problem-solving', 'analytical', 'critical thinking',
    'decision-making', 'time management', 'adaptability', 'flexibility', 'creativity', 'innovation',
    'detail-oriented', 'organized', 'self-motivated', 'proactive', 'initiative'
  ];
  
  // Extract keywords from job description
  const words = jobDescription.toLowerCase().match(/\b\w+\b/g) || [];
  const keywordCounts = {};
  
  words.forEach(word => {
    if (commonKeywords.includes(word) && !keywordCounts[word]) {
      keywordCounts[word] = 1;
    }
  });
  
  // Check for multi-word keywords
  commonKeywords.forEach(keyword => {
    if (keyword.includes(' ') && jobDescription.toLowerCase().includes(keyword)) {
      keywordCounts[keyword] = 1;
    }
  });
  
  return Object.keys(keywordCounts);
}

// Export functions for use in main.js
window.coverLetterTemplates = coverLetterTemplates;
window.generateResumeSummary = generateResumeSummary;
window.extractKeywords = extractKeywords;
