import api from './api';

export const taskService = {
  async getTasks(params?: {
    department?: string;
    status?: string;
    priority?: string;
    assignedTo?: string;
  }) {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  async getTask(id: string) {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data: any) {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: any) {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  async completeTask(id: string) {
    const response = await api.put(`/tasks/${id}/complete`);
    return response.data;
  },

  async addComment(id: string, text: string) {
    const response = await api.post(`/tasks/${id}/comments`, { text });
    return response.data;
  },

  async deleteTask(id: string) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
