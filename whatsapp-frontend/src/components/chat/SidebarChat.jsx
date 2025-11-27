import { Avatar } from '@mui/material';
import useChatStore from '../../store/chatStore';
import './SidebarChat.css';

function SidebarChat({ id, name, lastMessage, lastMessageTime, unreadCount }) {
    const { selectChat, currentChat } = useChatStore();

    const handleSelectChat = () => {
        selectChat(id);
    };

    const isSelected = currentChat?.id === id;

    return (
        <div onClick={handleSelectChat} className={`sidebarChat ${isSelected ? 'sidebarChat--selected' : ''}`}>
            <Avatar>{name?.charAt(0)?.toUpperCase()}</Avatar>
            <div className="sidebarChat__info">
                <div className="sidebarChat__info_header">
                    <h2>{name}</h2>
                    <p className="sidebarChat__timestamp">
                        {lastMessageTime ? new Date(lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                </div>
                <div className="sidebarChat__info_bottom">
                    <p className="sidebarChat__lastMessage">{lastMessage}</p>
                    {unreadCount > 0 && (
                        <span className="sidebarChat__unreadCount">{unreadCount}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SidebarChat;
