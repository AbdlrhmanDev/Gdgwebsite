import api from './api';

export const badgeService = {
  async getBadges(params?: {
    category?: string;
    rarity?: string;
  }) {
    const response = await api.get('/badges', { params });
    return response.data;
  },

  async getBadge(id: string) {
    const response = await api.get(`/badges/${id}`);
    return response.data;
  },

  async createBadge(data: any) {
    const response = await api.post('/badges', data);
    return response.data;
  },

  async updateBadge(id: string, data: any) {
    const response = await api.put(`/badges/${id}`, data);
    return response.data;
  },

  async deleteBadge(id: string) {
    const response = await api.delete(`/badges/${id}`);
    return response.data;
  },
};
