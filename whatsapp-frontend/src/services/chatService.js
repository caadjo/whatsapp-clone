import api from './api';

export const chatService = {
    // Buscar todos os chats do usuário
    getChats: async () => {
        const response = await api.get('/chats');
        return response.data;
    },

    // Criar um novo chat
    createChat: async (senderId, receiverId) => {
        const response = await api.post('/chats', null, {
            params: {
                'sender-id': senderId,
                'receiver-id': receiverId
            }
        });
        return response.data.response; // Retorna o chatId
    }
};

