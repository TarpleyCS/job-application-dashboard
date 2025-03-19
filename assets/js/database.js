// Database initialization and operations
class ApplicationDatabase {
  constructor() {
    this.db = new Dexie('JobApplicationsDB');
    this.initializeDatabase();
  }

  initializeDatabase() {
    this.db.version(1).stores({
      resumeData: 'id',
      applications: '++id, label, date, jobTitle, companyName'
    });
  }

  async saveResumeData(resumeData) {
    try {
      await this.db.resumeData.put({ id: 'default', data: resumeData });
      return true;
    } catch (error) {
      console.error('Error saving resume data:', error);
      return false;
    }
  }

  async getResumeData() {
    try {
      const data = await this.db.resumeData.get('default');
      return data ? data.data : null;
    } catch (error) {
      console.error('Error retrieving resume data:', error);
      return null;
    }
  }

  async saveApplication(applicationData) {
    try {
      applicationData.date = new Date().toISOString();
      const id = await this.db.applications.add(applicationData);
      return id;
    } catch (error) {
      console.error('Error saving application:', error);
      return null;
    }
  }

  async getAllApplications() {
    try {
      return await this.db.applications.toArray();
    } catch (error) {
      console.error('Error retrieving applications:', error);
      return [];
    }
  }

  async getApplicationById(id) {
    try {
      return await this.db.applications.get(id);
    } catch (error) {
      console.error('Error retrieving application:', error);
      return null;
    }
  }

  async deleteApplication(id) {
    try {
      await this.db.applications.delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting application:', error);
      return false;
    }
  }
}

// Initialize database
const appDB = new ApplicationDatabase();

// Export for use in other scripts
window.appDB = appDB;
