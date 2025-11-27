package com.alibou.whatsappclone.message;

import com.alibou.whatsappclone.chat.Chat;
import com.alibou.whatsappclone.chat.ChatRepository;
import com.alibou.whatsappclone.file.FileService;
import com.alibou.whatsappclone.file.FileUtils;
import com.alibou.whatsappclone.notification.Notification;
import com.alibou.whatsappclone.notification.NotificationService;
import com.alibou.whatsappclone.notification.NotificationType;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final MessageMapper mapper;
    private final FileService fileService;
    private final NotificationService notificationService;

    public void saveMessage(MessageRequest messageRequest) {
        Chat chat = chatRepository.findById(messageRequest.getChatId())
                .orElseThrow(() -> new EntityNotFoundException("Chat not found"));

        Message message = new Message();
        message.setContent(messageRequest.getContent());
        message.setChat(chat);
        message.setSenderId(messageRequest.getSenderId());
        message.setReceiverId(messageRequest.getReceiverId());
        message.setType(messageRequest.getType());
        message.setState(MessageState.SENT);

        LocalDateTime now = LocalDateTime.now();
        message.setCreatedDate(now);
        message.setLastModifiedDate(now);

        // Salva a mensagem para obter o ID real
        Message savedMessage = messageRepository.save(message);

        Notification notification = Notification.builder()
                .id(savedMessage.getId()) // Inclui o ID da mensagem
                .chatId(chat.getId())
                .messageType(savedMessage.getType())
                .content(savedMessage.getContent())
                .senderId(savedMessage.getSenderId())
                .receiverId(savedMessage.getReceiverId())
                .createdAt(savedMessage.getCreatedDate()) // Inclui a data de criação
                .type(NotificationType.MESSAGE)
                .chatName(chat.getChatName(message.getSenderId()))
                .build();

        notificationService.sendNotification(message.getReceiverId(), notification);
    }

    public List<MessageResponse> findChatMessages(String chatId) {
        return messageRepository.findMessagesByChatId(chatId)
                .stream()
                .map(mapper::toMessageResponse)
                .toList();
    }

    @Transactional
    public void setMessagesToSeen(String chatId, Authentication authentication) {
        // ... (código existente)
    }

    public void uploadMediaMessage(String chatId, MultipartFile file, Authentication authentication) {
        // ... (código existente)
    }

    private String getSenderId(Chat chat, Authentication authentication) {
        return authentication.getName();
    }

    private String getRecipientId(Chat chat, Authentication authentication) {
        if (chat.getSender().getId().equals(authentication.getName())) {
            return chat.getRecipient().getId();
        }
        return chat.getSender().getId();
    }
}
