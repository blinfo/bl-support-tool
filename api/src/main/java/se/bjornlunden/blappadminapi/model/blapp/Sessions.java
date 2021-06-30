package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @author Patrik Holmkvist on 2020-06-09
 */
@Entity
@Getter @Setter
public class Sessions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "key_", length = 50)
    private String key;

    @Column(name = "bearer_token", length = 50)
    private String bearerToken;

    @Column(length = 50)
    private String publicKey;

    @Column(name = "cld_user")
    private Long cloudUserId;

    @Column(length = 50)
    private String groupId;

    private LocalDateTime renewedAt;
}
