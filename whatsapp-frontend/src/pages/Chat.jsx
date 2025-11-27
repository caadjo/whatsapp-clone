import { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import useAuthStore from '../store/authStore';
import { useWebSocket } from '../hooks/useWebSocket';

function Chat() {
    const { keycloak, initialized } = useKeycloak();
    const { setUser } = useAuthStore();
    
    // Inicializa o WebSocket
    useWebSocket();

    useEffect(() => {
        if (initialized && keycloak.authenticated && keycloak.tokenParsed) {
            const userInfo = {
                id: keycloak.tokenParsed.sub,
                email: keycloak.tokenParsed.email,
                firstName: keycloak.tokenParsed.given_name || keycloak.tokenParsed.preferred_username,
                lastName: keycloak.tokenParsed.family_name || ''
            };
            setUser(userInfo);
        }
    }, [initialized, keycloak, setUser]);

    return (
        <>
            <Sidebar />
            <ChatWindow />
        </>
    );
}

export default Chat;
