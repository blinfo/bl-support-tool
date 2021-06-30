package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Patrik Holmkvist on 2020-06-08
 */
@Entity
@Table(name = "properties")
@Getter
@Setter
public class Property implements Serializable {
    private final static long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "key_")
    private String key;
    private String value;
    @Column(name = "data_type")
    private String dataType;

    @OneToMany(mappedBy = "property", fetch = FetchType.LAZY)
    private Set<ConnectionProperty> connectionProperties = new HashSet<>();
}
