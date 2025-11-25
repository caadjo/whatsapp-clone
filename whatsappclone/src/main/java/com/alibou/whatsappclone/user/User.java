package com.alibou.whatsappclone.user;

import com.alibou.whatsappclone.chat.Chat;
import com.alibou.whatsappclone.common.BaseAuditingEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")


public class User extends BaseAuditingEntity {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDateTime lastSeen;


    @OneToMany(mappedBy = "sender")
    private List<Chat> chatAsSender;
    @OneToMany(mappedBy = "recipient")
    private List<Chat> chatAsRecipient;


    @Transient
    public boolean isUserOnline(){
    return lastSeen != null && lastSeen.isAfter(LocalDateTime.now().minusMinutes(LAST_ACTIVE_INTERVAL));


    }



}
