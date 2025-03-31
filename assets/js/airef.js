const { Configuration, OpenAIApi } = require("openai");

async function aiTemplate(name, contactInfo, date, jobTitle, companyName, companyWebsite, keywords) {
  const configuration = new Configuration({
       
  });
  const openai = new OpenAIApi(configuration);

  const prompt = `
    Write a professional cover letter for the position of ${jobTitle} at ${companyName} (${companyWebsite}). The cover letter should include the following elements:
    - An introduction expressing interest in the ${jobTitle} position at ${companyName}.
    - A brief overview of professional experience, highlighting skills in ${keywords.slice(0, 3).join(', ')}.
    - Specific examples of past work, such as designing and implementing solutions that optimize complex systems, creating data pipelines, and building tools that accelerate decision-making processes.
    - Mention of technical proficiencies, including experience with ${keywords.slice(3, 6).join(', ')}.
    - An expression of enthusiasm about the opportunity to contribute to innovative approaches at ${companyName} and alignment with the company's vision.
    - A closing statement thanking the reader and expressing interest in discussing how the candidate's background could contribute to ${companyName}'s continued success.
    Format the cover letter appropriately with paragraphs.
    Here is a few examples of good letters:
    Your need for an Associate Application Support Administrator is an excellent match to my background and career goals. With a
    solid foundation in applications administration and data management, along with a passion for creating innovative tech
    solutions, I am confident in my ability to contribute to your team given the opportunity.
    In my current role at Mammoth Freighters, I designed and implemented software solutions that optimized and automated
    tasks for engineers and business executives. I organized and refined unstructured data to create visualizations that accelerated
    business decisions. My experience in systems administration, data analysis, and application support aligns well with the
    responsibilities outlined in the job description, particularly in managing data within specialized applications and developing
    standards for process improvement.
    I am particularly drawn to DOTI's commitment to equity and the culture built around investing in people, operating with
    discipline, using data to drive decisions, and delivering results. I want to drive positive change in my community using the
    technical skills I've fostered over the years, and I believe an opportunity to excel in this position supporting Denver's solid
    waste management systems is a great way to achieve that goal.
    Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to the success of
    the DOTI Solid Waste Management team.

    Dear Oracle Hiring Team
    Your need for a Software Engineer in Oracle Cloud Infrastructure's digital media production services team aligns perfectly with
    my background in full-stack development, data visualization, and system optimization. With extensive experience in designing
    scalable software solutions and implementing real-time applications, I am confident I can contribute immediately to OCI's
    mission of enabling animation, film, and game development studios to migrate their production pipelines to the cloud.
    To demonstrate my suitability for the role, I have directly relevant experience in developing scalable applications. At Mammoth
    Freighters, I designed and implemented full-stack applications that optimized complex workflows and integrated with various
    systems, demonstrating my ability to build robust, production-ready solutions. My experience with React, Vue, and Azure
    shows my capability to work with cloud services and modern development frameworks.
    Highlights of my recent achievements include:
    ● Developed a center-of-gravity calculator application that optimized complex configurations across multiple layouts,
    showcasing my ability to build scalable solutions for technical workflows
    ● Created data pipelines and visualization systems using PowerBI that enabled real-time monitoring and
    decision-making, demonstrating my experience with observability and analytics
    ● Designed and implemented web services that integrated with various systems and databases, proving my
    understanding of microservice architectures and REST APIs
    These abilities highlight my strong foundation in software development and system architecture, while operating in a
    fast-paced, technical environment. My academic background in Computer Science, with minors in Mathematics and Physics
    from the University of Denver, provides additional theoretical depth that would benefit the development of complex cloud
    services.
    Oracle Cloud Infrastructure's commitment to innovation in cloud services for the media and entertainment industry is
    particularly exciting. My experience in developing interactive systems and optimizing complex workflows, combined with my
    proven ability to collaborate across teams, makes me well-suited to contribute to OCI's mission of enabling digital
    transformation in the media production industry.
    My resume provides additional information about my specific achievements. I look forward to discussing how my technical
    skills and experience can contribute to the success of the Oracle Cloud Infrastructure team.
    Sincerely,
    Alex Tarpley


    Dear Watts Engineering Hiring Team,
    Your need for an Inside Sales Engineer aligns perfectly with my background in technical solutions development, project
    coordination, and system optimization. With extensive experience in translating complex requirements into practical solutions
    and implementing customer-facing applications, I am confident I can contribute immediately to Watts’ mission of delivering
    innovative water solutions and exceptional customer service.
    To demonstrate my suitability for the role, I have directly relevant experience in coordinating technical projects and supporting
    customer needs. At Mammoth Freighters, I designed and implemented solutions that bridged technical complexity with user
    requirements and collaborated across departments, demonstrating my ability to facilitate smooth project execution. My
    experience with technical documentation, data visualization, and cross-functional communication shows my capability to
    support complex HVAC equipment specifications and customer requirements.
    Highlights of my recent achievements include:
    ● Developed a center-of-gravity calculator that reduced cargo planning time and mathematical errors, showcasing my
    ability to understand and implement technical specifications
    ● Created visualization systems using PowerBI that enabled real-time project monitoring, demonstrating my experience
    with tracking and coordinating complex technical processes
    ● Implemented an automated market research system that accelerated decision-making processes, proving my ability to
    research and qualify opportunities efficiently
    These abilities highlight my strong foundation in technical analysis and project coordination, while operating in a fast-paced,
    customer-focused environment. My academic background in Computer Science, with minors in Mathematics and Physics from
    the University of Denver, provides additional technical depth that would benefit the evaluation of HVAC systems and
    specifications.
    Watts Engineering's commitment to providing sustainable water solutions and best-in-class products is particularly exciting.
    My experience in developing technical solutions and coordinating cross-functional projects, combined with my proven ability
    to support customer needs, makes me well-suited to contribute to Watts's mission of protecting our planet's most valuable
    resource while delivering exceptional service.
    My resume provides additional information about my specific achievements. I look forward to discussing how my technical
    expertise and coordination experience can contribute to the success of the Watts Engineering team.
    Sincerely, Alex Tarpley

  `;

  try {
    const response = await openai.createCompletion({
      model: "", // Use an appropriate model
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const coverLetter = response.data.choices[0].text.trim();
    return coverLetter;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw error;
  }
}
/*
// Example usage
aiTemplate(name, contactInfo, date, jobTitle, companyName, companyWebsite, keywords)
  .then(coverLetter => {
    console.log(coverLetter);
  })
  .catch(error => {
    console.error("Failed to generate cover letter:", error);
  });
*/
  window.aiTemplate = aiTemplate;