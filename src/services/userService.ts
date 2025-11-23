import api from './api';

export const userService = {
  async getUsers(params?: {
    role?: string;
    department?: string;
    search?: string;
  }) {
    const response = await api.get('/users', { params });
    return response.data;
  },

  async getUser(id: string) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(userData: any) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  async updateUser(id: string, userData: any) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async addPoints(userId: string, points: number, reason: string) {
    const response = await api.post(`/users/${userId}/points`, {
      points,
      reason,
    });
    return response.data;
  },

  async awardBadge(userId: string, badgeId: string) {
    const response = await api.post(`/users/${userId}/badges`, {
      badgeId,
    });
    return response.data;
  },

  async getLeaderboard(limit?: number) {
    const response = await api.get('/users/leaderboard', {
      params: { limit },
    });
    return response.data;
  },
};
