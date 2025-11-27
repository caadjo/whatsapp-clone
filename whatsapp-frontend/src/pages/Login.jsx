import { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

function Login() {
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        if (initialized && !keycloak.authenticated) {
            // Redirecionar para o login do Keycloak
            keycloak.login({
                redirectUri: window.location.origin + '/chat'
            }).catch(err => {
                console.error('Erro ao fazer login:', err);
            });
        }
    }, [initialized, keycloak]);

    if (!initialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#00a884]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white">Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#00a884]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Redirecionando para login...</p>
            </div>
        </div>
    );
}

export default Login;
