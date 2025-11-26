package com.alibou.whatsappclone.chat;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatMapper mapper;


    // PROVAVEL ERRO CHAT RESPONSE -> CHAT - TROCAR PARAMETROS

    @Transactional(readOnly = true)
    public List<ChatResponse> getChatsByReceiverId(Authentication currentUser){
        final String userId = currentUser.getName();
        return chatRepository.findChatsBySenderId(userId)
                .stream()
                .map(c -> mapper.toChatResponse(c,userId))
                .toList();

    }

    public String createChat(String senderId,String receiverId){
        Optional<Chat> exitingChat = chatRepository.findChatByReceiverAndSender(senderId,receiverId);

    }
}
