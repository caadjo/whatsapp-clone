import { useState } from 'react';
import { Search, MoreVert, Chat as ChatIcon, DonutLarge, ArrowBack } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import useAuthStore from '../../store/authStore';
import ChatList from '../chat/ChatList';
import UserList from './UserList'; // Criaremos este componente
import './Sidebar.css';

function Sidebar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showUsers, setShowUsers] = useState(false);
    const { keycloak } = useKeycloak();
    const user = useAuthStore((state) => state.user);

    const handleLogout = () => {
        keycloak.logout();
    };

    const handleShowUsers = () => {
        setShowUsers(true);
    };

    const handleHideUsers = () => {
        setShowUsers(false);
    };

    return (
        <div className="sidebar">
            {/* Sidebar Header */}
            <div className="sidebar__header">
                {showUsers ? (
                    <div className="sidebar__header_newChat">
                        <IconButton onClick={handleHideUsers}>
                            <ArrowBack />
                        </IconButton>
                        <h3>New Chat</h3>
                    </div>
                ) : (
                    <>
                        <Avatar src={user?.avatarUrl}>
                            {user?.firstName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <div className="sidebar__headerRight">
                            <IconButton>
                                <DonutLarge />
                            </IconButton>
                            <IconButton onClick={handleShowUsers}>
                                <ChatIcon />
                            </IconButton>
                            <IconButton onClick={handleLogout} title="Logout">
                                <MoreVert />
                            </IconButton>
                        </div>
                    </>
                )}
            </div>

            {/* Sidebar Search */}
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <Search />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={showUsers ? "Search users" : "Search or start new chat"}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="sidebar__chats">
                {showUsers ? (
                    <UserList searchTerm={searchTerm} onUserSelected={handleHideUsers} />
                ) : (
                    <ChatList searchTerm={searchTerm} />
                )}
            </div>
        </div>
    );
}

export default Sidebar;
