package com.alibou.whatsappclone.user;

import com.alibou.whatsappclone.chat.Chat;
import com.alibou.whatsappclone.common.BaseAuditingEntity;
import jakarta.persistence.*;
import jdk.jfr.Name;
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

@NamedQuery(name = UserConstants.FIND_USER_BY_EMAIL,
            query = "SELECT u FROM  User u WHERE u.email = :email")
@NamedQuery(name = UserConstants.FIND_ALL_USER_EXCEPT_SELF,
            query = "SELECT u  FROM User u WHERE u.id !=:publicId")

@NamedQuery(name = UserConstants.FIND_USER_BY_PUBLIC_ID,
            query = "SELECT u  FROM User u WHERE u.id =:publicId")


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
