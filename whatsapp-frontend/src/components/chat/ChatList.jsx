import { useEffect } from 'react';
import useChatStore from '../../store/chatStore';
import SidebarChat from './SidebarChat';

function ChatList({ searchTerm = '' }) {
    const { chats, loadChats, loading } = useChatStore();

    useEffect(() => {
        const interval = setInterval(() => {
            loadChats();
        }, 5000); // Recarrega os chats a cada 5 segundos para atualizações
        loadChats(); // Carga inicial
        return () => clearInterval(interval);
    }, [loadChats]);

    const filteredChats = chats.filter(chat =>
        chat.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && chats.length === 0) {
        return <div className="sidebar__chats_loading">Loading chats...</div>;
    }

    return (
        <div className="sidebar__chats">
            {filteredChats.map((chat) => (
                <SidebarChat
                    key={chat.id}
                    id={chat.id}
                    name={chat.name}
                    lastMessage={chat.lastMessage}
                    lastMessageTime={chat.lastMessageTime}
                    unreadCount={chat.unreadCount}
                />
            ))}
        </div>
    );
}

export default ChatList;
