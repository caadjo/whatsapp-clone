import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './config/keycloak';
import App from './App.jsx';
import './index.css';

// Polyfill para global (necessário para sockjs-client)
if (typeof global === 'undefined') {
    window.global = globalThis;
}

// Configurações de inicialização do Keycloak
const keycloakInitOptions = {
    onLoad: 'login-required', // Exige login ao carregar
    pkceMethod: 'S256', // Segurança adicional
    checkLoginIframe: false, // Desabilita check de iframe para evitar problemas
    enableLogging: true, // Habilita logs para debug
    flow: 'standard', // Usar flow padrão
};

// Callback quando o token é atualizado
const onKeycloakTokens = (tokens) => {
    if (tokens.token) {
        localStorage.setItem('token', tokens.token);
        console.log('✅ Token atualizado:', tokens.token.substring(0, 20) + '...');
    }
};

// Callback de erro do Keycloak
const onKeycloakError = (error) => {
    console.error('❌ Erro no Keycloak:', error);
};

// Renderizar a aplicação
try {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <ReactKeycloakProvider
                authClient={keycloak}
                initOptions={keycloakInitOptions}
                onTokens={onKeycloakTokens}
                onEvent={(event, error) => {
                    if (event === 'onAuthError') {
                        console.error('❌ Erro de autenticação:', error);
                    }
                }}
            >
                <App />
            </ReactKeycloakProvider>
        </StrictMode>
    );
} catch (error) {
    console.error('❌ Erro ao renderizar aplicação:', error);
    document.getElementById('root').innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column;">
            <h1 style="color: red;">Erro ao carregar aplicação</h1>
            <p>${error.message}</p>
            <p>Verifique o console para mais detalhes.</p>
        </div>
    `;
}