package se.bjornlunden.blappadminapi.model.blapp;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Patrik Holmkvist on 2020-06-08
 */
@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String pin;
    @Column(name = "profile_picture_URL")
    private String profilePictureUrl;
    private String source;
    @Column(name = "chat_username")
    private String userName;
    @Column(name = "chat_user_id")
    private String chatUserId;
    @Column(name = "chat_auth_token")
    private String chatAuthToken;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Connection> connections = new HashSet<>();
}
