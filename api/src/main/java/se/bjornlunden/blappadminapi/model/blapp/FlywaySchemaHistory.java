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
public class FlywaySchemaHistory {
    @Id
    private Long installedRank;

    private String version;
    private String description;
    private String type;
    private String script;

    @Column(name = "checksum")
    private Long checkSum;

    private String installedBy;
    private LocalDateTime installedAt;
    private Long executionTime;
    private Integer success;
}
