# Job Application Dashboard

A Jekyll/Ruby application that helps you create customized cover letters and resume summaries based on job descriptions. The application uses an unstructured database to store your applications with labels for easy differentiation.

## Features

- Input job descriptions and company information
- Generate customized cover letters based on four different templates:
  - General
  - Technical
  - Creative
  - Management
- Create tailored resume summaries that highlight relevant skills for each job
- Save applications with labels for easy differentiation
- Generate PDF files of your cover letters
- Store and retrieve your resume data between sessions
- Intelligent job description analysis that extracts keywords to customize your documents

## Deployment Instructions

### GitHub Pages Deployment

1. Create a new GitHub repository
2. Push the contents of this directory to the repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/job-application-dashboard.git
   git push -u origin main
   ```
3. Go to the repository settings on GitHub
4. Navigate to the "Pages" section
5. Under "Source", select the branch you want to deploy (usually `main`)
6. Select the folder `/` (root) as the source
7. Click "Save"
8. GitHub will provide you with a URL where your site is published

### Local Development

To run the application locally:

1. Make sure you have Ruby and Jekyll installed
2. Navigate to the project directory
3. Run `bundle install` to install dependencies
4. Run `bundle exec jekyll serve` to start the local server
5. Open your browser and go to `http://localhost:4000`

## Usage

1. Enter the job description, company website, job title, and company name
2. Enter your resume data or use the "Load Saved Resume" button if you've saved it previously
3. Select a cover letter template that matches the job type
4. Add a label to help you identify this application later
5. Click "Generate Documents" to create your cover letter and resume summary
6. Use the "Save Application" button to store this application for future reference
7. Use the "Download PDF" button to save your cover letter as a PDF file

## Technologies Used

- Jekyll/Ruby for static site generation
- JavaScript for client-side functionality
- IndexedDB for unstructured database storage
- HTML/CSS for frontend interface
- jsPDF for PDF generation

## License

This project is licensed under the MIT License - see the LICENSE file for details.
