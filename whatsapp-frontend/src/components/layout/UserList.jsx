import { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import useChatStore from '../../store/chatStore';
import useAuthStore from '../../store/authStore';
import { chatService, userService } from '../../services';
import '../chat/SidebarChat.css'; // Reutilizando o estilo

function UserList({ searchTerm = '', onUserSelected }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectChat, loadChats } = useChatStore();
    const currentUser = useAuthStore((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const allUsers = await userService.getAllUsers();
                // Filtrar o usuário atual da lista
                const otherUsers = allUsers.filter(user => user.id !== currentUser.id);
                setUsers(otherUsers);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [currentUser.id]);

    const handleUserClick = async (receiver) => {
        try {
            // Tenta criar um novo chat
            const newChat = await chatService.createChat(currentUser.id, receiver.id);
            // Recarrega a lista de chats para incluir o novo
            await loadChats();
            // Seleciona o novo chat
            selectChat(newChat.id);
            // Fecha a lista de usuários
            if (onUserSelected) {
                onUserSelected();
            }
        } catch (error) {
            console.error("Failed to create chat:", error);
        }
    };

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="sidebar__chats">Loading users...</div>;
    }

    return (
        <div className="sidebar__chats">
            {filteredUsers.map((user) => (
                <div key={user.id} onClick={() => handleUserClick(user)} className="sidebarChat">
                    <Avatar src={user.avatarUrl}>
                        {user.firstName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <div className="sidebarChat__info">
                        <h2>{`${user.firstName} ${user.lastName}`}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserList;
