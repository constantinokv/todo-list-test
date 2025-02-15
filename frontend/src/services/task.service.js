import api from './api';

export const taskService = {
    getTasks: () => api.get('/tasks'),
    createTask: (task) => api.post('/tasks', task),
    updateTask: (id, task) => api.put(`/tasks/${id}`, task),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
    updateTaskStatus: (id, status) => api.put(`/tasks/${id}`, { status })
};