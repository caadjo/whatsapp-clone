package com.alibou.whatsappclone.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserResponse> getAllUsersExceptSelf(Authentication connectedUser) {
        log.info("Buscando todos os usuários, exceto o usuário com ID: {}", connectedUser.getName());
        List<User> users = userRepository.findAllUsersExceptSelf(connectedUser.getName());
        log.info("Encontrados {} usuários no banco de dados.", users.size());
        return users.stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    public void synchronizeUser(Jwt jwt) {
        String userId = jwt.getSubject();
        log.info("Iniciando sincronização para o usuário com ID: {}", userId);
        
        if (!userRepository.existsById(userId)) {
            log.info("Usuário com ID {} não encontrado no banco de dados local. Criando novo usuário.", userId);
            User newUser = new User();
            newUser.setId(userId);
            newUser.setEmail(jwt.getClaimAsString("email"));
            newUser.setFirstName(jwt.getClaimAsString("given_name"));
            newUser.setLastName(jwt.getClaimAsString("family_name"));
            
            // Definindo as datas manualmente
            LocalDateTime now = LocalDateTime.now();
            newUser.setCreatedDate(now);
            newUser.setLastModifiedDate(now);

            userRepository.save(newUser);
            log.info("Novo usuário com ID {} salvo com sucesso.", userId);
        } else {
            log.info("Usuário com ID {} já existe no banco de dados local. Sincronização não necessária.", userId);
        }
    }
}
