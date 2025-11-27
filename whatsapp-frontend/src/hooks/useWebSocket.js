import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useChatStore from '../store/chatStore';
import useAuthStore from '../store/authStore';

const WS_URL = 'http://localhost:8088/ws';

export const useWebSocket = () => {
    const clientRef = useRef(null);
    // Pegamos a função 'addMessage' e 'loadChats' do store
    const { addMessage, loadChats } = useChatStore();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (!user?.id) return;

        const client = new Client({
            webSocketFactory: () => new SockJS(WS_URL),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('✅ WebSocket conectado');
                
                client.subscribe(`/user/${user.id}/queue/notifications`, (message) => {
                    try {
                        const notification = JSON.parse(message.body);
                        console.log('📨 Nova notificação recebida:', notification);
                        
                        if (notification.type === 'MESSAGE' && notification.chatId) {
                            // Em vez de recarregar tudo, apenas adicionamos a nova mensagem ao estado
                            const newMessage = {
                                id: notification.id, // Usamos o ID real vindo do backend
                                content: notification.content,
                                senderId: notification.senderId,
                                receiverId: notification.receiverId,
                                chatId: notification.chatId,
                                type: notification.messageType || 'TEXT',
                                state: 'SENT',
                                createdAt: notification.createdAt || new Date().toISOString(),
                                media: notification.media
                            };
                            addMessage(newMessage);
                            // E atualizamos a lista de chats para o contador e a última mensagem
                            loadChats();
                        }

                    } catch (error) {
                        console.error('Erro ao processar mensagem WebSocket:', error);
                    }
                });
            },
            onStompError: (frame) => {
                console.error('❌ Erro STOMP:', frame);
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, [user?.id, addMessage, loadChats]);

    return {};
};
