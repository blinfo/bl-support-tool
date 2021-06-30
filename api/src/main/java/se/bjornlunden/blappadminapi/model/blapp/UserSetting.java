package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author Patrik Holmkvist on 2020-06-09
 */
@Entity
@Table(name = "user_settings")
@Getter @Setter
public class UserSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "key_", length = 100)
    private String key;

    @Column(length = 100)
    private String value;
}
