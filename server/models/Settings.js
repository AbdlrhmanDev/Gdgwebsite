const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: "GDG on Campus - جامعة المستقبل" },
  siteDescription: { type: String, default: "مجتمع مطوري Google في جامعة المستقبل" },
  contactEmail: { type: String, default: "gdg@mustaqbal.edu" },
  contactPhone: { type: String, default: "+966 XX XXX XXXX" },
  
  emailNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: true },
  eventReminders: { type: Boolean, default: true },
  weeklyDigest: { type: Boolean, default: true },
  
  smtpServer: { type: String, default: "smtp.gmail.com" },
  smtpPort: { type: String, default: "587" },
  smtpUsername: { type: String, default: "gdg@mustaqbal.edu" },
  smtpPassword: { type: String },
  
  allowMemberRegistration: { type: Boolean, default: true },
  requireEmailVerification: { type: Boolean, default: true },
  autoApproveMembers: { type: Boolean, default: false },
  allowEventCreation: { type: Boolean, default: false },
  
  primaryColor: { type: String, default: "#4285f4" },
  secondaryColor: { type: String, default: "#34a853" },
  darkMode: { type: Boolean, default: false },
  rtlSupport: { type: Boolean, default: true },
  
  googleAnalyticsId: { type: String },
  googleCalendarSync: { type: Boolean, default: false },
  googleDriveIntegration: { type: Boolean, default: false },
  googleMeetIntegration: { type: Boolean, default: true },
  
  certificateTemplate: { type: String, default: "default" },
  autoGenerateCertificates: { type: Boolean, default: true },
  certificateSignature: { type: String, default: "Dr. Ahmed Al-Rashid" },
  
  backupFrequency: { type: String, default: "daily" },
  dataRetention: { type: String, default: "1year" },
  apiAccess: { type: Boolean, default: false },
  apiKey: { type: String }
});

module.exports = mongoose.model('Settings', settingsSchema);
