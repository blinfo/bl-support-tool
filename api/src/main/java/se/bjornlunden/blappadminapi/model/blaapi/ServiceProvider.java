package se.bjornlunden.blappadminapi.model.blaapi;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Patrik Holmkvist on 2021-04-12
 */
@Data
@Entity
@Table(name = "service_providers")
public class ServiceProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_key")
    private String publicKey;
    @Column(name = "gateway_client_id")
    private String gatewayClientId;
    private String name;
    @Column(name = "available_scopes")
    private String availableScopes;
    private String description;
    @Column(name = "www")
    private String website;
    private String email;
    private String phone;
    private Short live;
    @Column(name = "public_access")
    private Short publicAccess;
    @Column(name = "b2bEmail")
    private String b2bEmail;
}
