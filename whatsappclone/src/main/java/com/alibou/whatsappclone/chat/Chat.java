package com.alibou.whatsappclone.chat;
import com.alibou.whatsappclone.common.BaseAuditingEntity;
import com.alibou.whatsappclone.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chat")
public class Chat extends BaseAuditingEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private User sender;
    private User recipient;
    private List<Message> messages;

}
