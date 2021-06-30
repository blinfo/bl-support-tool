package se.bjornlunden.blappadminapi.model.blaapi;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @author Patrik Holmkvist on 2021-04-12
 */
@Getter
@Entity
@Table(name = "users_service_providers")
public class UsersServiceProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "service_provider_id")
    private Long serviceProviderId;
    @Column(name = "create_time")
    private LocalDateTime createTime;
    private Short active;
    @Column(name = "paying_customer_number")
    private Long payingCustomerNumber;
    @Column(name = "available_scopes")
    private String availableScopes;
    @Column(name = "external_customer_id")
    private String externalCustomerId;
    @Column(name = "cloud_user_id")
    private Long cloudUserId;
}
