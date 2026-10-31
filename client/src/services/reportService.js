import api from './authService';

export const reportService = {
  submit: (formData) =>
    api.post('/reports', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAll: (params) => api.get('/reports', { params }),
  getById: (id) => api.get(`/reports/${id}`),
  track: (reportId) => api.get(`/reports/track/${reportId}`),
  getMyReports: () => api.get('/reports/my'),
  updateStatus: (id, data) => api.patch(`/reports/${id}/status`, data),
  assign: (id, data) => api.patch(`/reports/${id}/assign`, data),
  override: (id, data) => api.patch(`/reports/${id}/override`, data),
};

export const analyticsService = {
  getSummary: () => api.get('/analytics/summary'),
  getHotspots: () => api.get('/analytics/hotspots'),
  getActionBrief: () => api.get('/analytics/brief'),
};

export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getRecent: () => api.get('/admin/recent'),
};

