import api from './api';

export const settingsService = {
  async getSettings() {
    const response = await api.get('/settings');
    return response.data;
  },

  async updateSettings(settings: any) {
    const response = await api.put('/settings', settings);
    return response.data;
  }
};