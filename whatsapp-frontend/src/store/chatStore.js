import { create } from 'zustand';
import { chatService, messageService } from '../services';

const useChatStore = create((set, get) => ({
    chats: [],
    currentChat: null,
    messages: {},
    users: [],
    loading: false,
    error: null,

    // Carregar chats
    loadChats: async () => {
        set({ loading: true, error: null });
        try {
            const chats = await chatService.getChats();
            set({ chats, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Selecionar chat
    selectChat: async (chatId) => {
        const currentChat = get().chats.find(c => c.id === chatId);
        set({ currentChat });

        if (!get().messages[chatId] || get().messages[chatId].length === 0) {
            await get().loadMessages(chatId);
        }
    },

    // Carregar mensagens de um chat
    loadMessages: async (chatId) => {
        try {
            const newMessages = await messageService.getMessages(chatId);
            set(state => {
                const updatedMessages = { ...state.messages };
                updatedMessages[chatId] = newMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Ordena por data
                return { messages: updatedMessages };
            });
        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
        }
    },

    // Adicionar mensagem (usado pelo WebSocket)
    addMessage: (message) => {
        const chatId = message.chatId;
        if (!chatId) return;
        
        set(state => {
            const existingMessages = state.messages[chatId] || [];
            const messageExists = existingMessages.some(m => m.id === message.id);
            
            if (messageExists) {
                return state;
            }

            const updatedMessagesForChat = [...existingMessages, message].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            
            const updatedMessages = {
                ...state.messages,
                [chatId]: updatedMessagesForChat
            };

            const updatedChats = state.chats.map(chat => 
                chat.id === chatId 
                    ? { ...chat, lastMessage: message.content || 'Mídia', lastMessageTime: message.createdAt || new Date().toISOString() }
                    : chat
            );
            
            return {
                messages: updatedMessages,
                chats: updatedChats
            };
        });
    },

    // Criar novo chat
    createChat: async (senderId, receiverId) => {
        try {
            const newChat = await chatService.createChat(senderId, receiverId);
            await get().loadChats();
            // O selectChat agora vai carregar as mensagens
            get().selectChat(newChat.id);
            return newChat;
        } catch (error) {
            console.error('Erro ao criar chat:', error);
            throw error;
        }
    },

    // Carregar usuários
    loadUsers: async () => {
        try {
            const { userService } = await import('../services/userService');
            const users = await userService.getAllUsers();
            set({ users });
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    }
}));

export default useChatStore;
