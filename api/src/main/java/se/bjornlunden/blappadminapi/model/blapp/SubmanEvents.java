package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @author Patrik Holmkvist on 2020-06-09
 */
@Entity
@Table(name = "subman_events")
@Getter @Setter
public class SubmanEvents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_key")
    private String publicKey;

    private String principal;

    @Column(name = "customer_number")
    private String customerNumber;
    private String action;

    @Column(name = "bla_product_id")
    private String blaProductId;

    private LocalDateTime created;

    private LocalDateTime handled;
}
