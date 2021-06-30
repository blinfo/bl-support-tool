package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Patrik Holmkvist on 2020-06-09
 */
@Entity
@Data
@Table(name = "packet")
public class Solution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double price;

    @Column(name = "price_per_user")
    private Double pricePerUser;

    @Column(name = "bla_product_id")
    private String blaProductId;

    private String description;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "parent_id")
    private Long parentId;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "packet_module", joinColumns = @JoinColumn(name = "packet_id"),
            inverseJoinColumns = @JoinColumn(name = "module_id"))
    private Set<BlappModule> blappModules = new HashSet<>();
}
