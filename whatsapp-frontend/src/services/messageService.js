import api from './api';

export const messageService = {
    // Buscar mensagens de um chat
    getMessages: async (chatId) => {
        const response = await api.get(`/messages/chat/${chatId}`);
        return response.data;
    },

    // Enviar uma mensagem
    sendMessage: async (message) => {
        await api.post('/messages', message);
    },

    // Marcar mensagens como lidas
    markAsSeen: async (chatId) => {
        await api.patch('/messages', null, {
            params: {
                'chat-id': chatId
            }
        });
    },

    // Upload de mídia
    uploadMedia: async (chatId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('chat-id', chatId);
        
        await api.post('/messages/upload-media', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

