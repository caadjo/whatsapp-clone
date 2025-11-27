import { create } from 'zustand';

// Store simplificado para Keycloak
// O Keycloak gerencia a autenticação, então só guardamos info do usuário
const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    // Definir usuário após login no Keycloak
    setUser: (user) => set({ user, isAuthenticated: !!user }),

    // Limpar usuário no logout
    clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;