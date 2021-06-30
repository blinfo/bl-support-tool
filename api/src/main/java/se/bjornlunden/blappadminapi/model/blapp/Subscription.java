package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Patrik Holmkvist on 2020-06-09
 */
@Entity
@Getter
@Setter
@Table(name = "subscription")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "connection_id")
    private Long connectionId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "packet_id", referencedColumnName = "id")
    private Solution solution;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "subscription_module", joinColumns = @JoinColumn(name = "subscription_id"),
            inverseJoinColumns = @JoinColumn(name = "module_id"))
    private Set<BlappModule> blappModules = new HashSet<>();
}
