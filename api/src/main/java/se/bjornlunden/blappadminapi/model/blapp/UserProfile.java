package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Patrik Holmkvist on 2020-06-08
 */
@Entity
@Table(name = "user_profiles")
@Getter
@Setter
public class UserProfile {
    @Id
    private Integer id;
    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "picture_url")
    private String pictureUrl;
}
