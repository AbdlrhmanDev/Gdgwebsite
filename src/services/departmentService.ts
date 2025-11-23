import api from './api';

export const departmentService = {
  async getDepartments() {
    const response = await api.get('/departments');
    return response.data;
  },

  async getDepartment(id: string) {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  },

  async createDepartment(data: any) {
    const response = await api.post('/departments', data);
    return response.data;
  },

  async updateDepartment(id: string, data: any) {
    const response = await api.put(`/departments/${id}`, data);
    return response.data;
  },

  async addMember(departmentId: string, userId: string) {
    const response = await api.post(`/departments/${departmentId}/members`, {
      userId,
    });
    return response.data;
  },
};
