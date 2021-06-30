package se.bjornlunden.blappadminapi.model.blapp;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * @author Patrik Holmkvist on 2020-06-08
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "connections")
public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "public_key")
    private String publicKey;
    @Column(name = "cld_user")
    private Long cloudUserId;
    private String email;
    @Column(name = "last_active")
    private LocalDateTime lastActive;

    @OneToMany(mappedBy = "connection", fetch = FetchType.LAZY)
    private Set<ConnectionProperty> connectionProperties;
}
