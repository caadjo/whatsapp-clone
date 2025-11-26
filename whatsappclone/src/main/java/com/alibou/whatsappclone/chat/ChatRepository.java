package com.alibou.whatsappclone.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface ChatRepository extends JpaRepository<Chat,String> {
    @Query(name = ChatConstants.FIND_CHAT_BY_SENDER_ID)
    List<ChatResponse> findChatsBySenderId(@Param("senderId") String userId);

    @Query(name = ChatConstants.FIND_CHAT_BY_SENDER_ID_AND_RECEIVER)
    Optional<Chat> findChatByReceiverAndSender(@Param("senderId") String senderId, @Param("recipientId") String receiverId);
}
