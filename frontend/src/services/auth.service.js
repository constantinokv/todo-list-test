import api from './api';

export const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { 
                email, 
                password 
            });
            console.log('Respuesta del servicio:', response); // Debug
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                return {
                    user: { email },
                    token: response.data.token
                };
            }
            throw new Error('No token received');
        } catch (error) {
            console.error('Error en auth.service:', error);
            throw error;
        }
    },

    register: async (username, email, password) => {
        const response = await api.post('/auth/register', {
            username,
            email,
            password
        });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};