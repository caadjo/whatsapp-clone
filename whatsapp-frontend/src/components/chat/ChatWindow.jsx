import { useState, useEffect, useRef } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, MoreVert, Search, InsertEmoticon, Mic, Send } from '@mui/icons-material';
import useChatStore from '../../store/chatStore';
import useAuthStore from '../../store/authStore';
import { messageService } from '../../services';
import './Chat.css';

function ChatWindow() {
    const [input, setInput] = useState('');
    // Adicionando 'addMessage' para a atualização otimista
    const { currentChat, messages, loadMessages, addMessage } = useChatStore();
    const user = useAuthStore((state) => state.user);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (currentChat) {
            loadMessages(currentChat.id);
        }
    }, [currentChat, loadMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || !currentChat || !user) return;

        const messageData = {
            content: input.trim(),
            senderId: user.id,
            receiverId: currentChat.receiverId === user.id ? currentChat.senderId : currentChat.receiverId,
            chatId: currentChat.id,
            type: 'TEXT',
        };

        // 1. Atualização Otimista: Adiciona a mensagem à UI do remetente imediatamente
        const optimisticMessage = {
            ...messageData,
            id: Date.now(), // ID temporário
            createdAt: new Date().toISOString(),
            state: 'SENT',
        };
        addMessage(optimisticMessage);
        setInput('');

        try {
            // 2. Envia a mensagem para o backend em segundo plano
            await messageService.sendMessage(messageData);
            // O backend cuidará de notificar o destinatário
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            // Opcional: Adicionar lógica para marcar a mensagem como "falhou" na UI
        }
    };

    if (!currentChat) {
        return (
            <div className="chat chat__initial_bg">
                <div className="chat__initial">
                    <img src="/whatsapp-logo.png" alt="WhatsApp" style={{ width: '250px', marginBottom: '20px' }} />
                    <h2>WhatsApp Web Clone</h2>
                    <p>Send and receive messages without keeping your phone online.</p>
                </div>
            </div>
        );
    }

    const chatMessages = messages[currentChat.id] || [];

    return (
        <div className="chat">
            {/* Chat Header */}
            <div className="chat__header">
                <Avatar src={currentChat.avatarUrl}>
                    {currentChat.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div className="chat__headerInfo">
                    <h3>{currentChat.name}</h3>
                    <p>last seen {new Date().toLocaleDateString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            {/* Chat Body */}
            <div className="chat__body">
                {chatMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat__message ${message.senderId === user?.id ? 'chat__receiver' : ''}`}
                    >
                        <p className="chat__message_content">{message.content}</p>
                        <span className="chat__timestamp">
                            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Footer */}
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <form onSubmit={handleSendMessage}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button type="submit" style={{ display: 'none' }}>Send</button>
                </form>
                <IconButton onClick={handleSendMessage}>
                    {input ? <Send /> : <Mic />}
                </IconButton>
            </div>
        </div>
    );
}

export default ChatWindow;
