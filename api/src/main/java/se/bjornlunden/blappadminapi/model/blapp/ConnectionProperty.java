package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author Patrik Holmkvist on 2020-06-08
 */
@Entity
@Table(name = "connections_properties")
@Getter
@Setter
public class ConnectionProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "connection_id")
    private Connection connection;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    private Property property;

    private String value;
}
