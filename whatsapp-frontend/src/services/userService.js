import api from './api';

export const userService = {
    // Buscar todos os usuários (exceto o próprio)
    getAllUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    }
};

