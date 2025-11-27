import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'http://localhost:9090/',  // URL do Keycloak
    realm: 'whatsapp-clone',         // Realm configurado (deve corresponder ao criado no Keycloak)
    clientId: 'whatsapp-client',     // Client ID configurado
};

const keycloak = new Keycloak(keycloakConfig);

// Adicionar logs para debug
keycloak.onAuthSuccess = () => {
    console.log('✅ Autenticação bem-sucedida');
};

keycloak.onAuthError = (error) => {
    console.error('❌ Erro de autenticação:', error);
};

keycloak.onTokenExpired = () => {
    console.log('🔄 Token expirado, renovando...');
};

export default keycloak;



