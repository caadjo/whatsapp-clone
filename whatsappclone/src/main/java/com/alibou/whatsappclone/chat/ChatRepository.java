package com.alibou.whatsappclone.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ChatRepository extends JpaRepository<Chat,String> {
    @Query(name = ChatConstants.FIND_CHAT_BY_SENDER_ID)
    List<ChatResponse> findChatsBySenderId(@Param("senderId") String userId);
}
