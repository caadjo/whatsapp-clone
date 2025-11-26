package com.alibou.whatsappclone.chat;


import com.alibou.whatsappclone.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatMapper {

    private final UserRepository userRepository;

    public ChatMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ChatResponse toChatResponse(Chat chat, String senderId) {


        return ChatResponse.builder()
                .id(chat.getId())
                .name(chat.getChatName(senderId))
                .unreadCount(chat.getUnreadMessages(senderId))
                .isRecipientOnline(chat.getRecipient().isUserOnline())
                .senderId(chat.getSender().getId())
                .receiverId(chat.getRecipient().getId())
                .build();

    }
}
