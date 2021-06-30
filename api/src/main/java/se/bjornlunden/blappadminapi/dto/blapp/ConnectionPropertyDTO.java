package se.bjornlunden.blappadminapi.dto.blapp;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Patrik Holmkvist on 2020-09-04
 */
@Getter @Setter
public class ConnectionPropertyDTO {
    private Long id;
    private String value;
    private PropertyDTO property;
    private ConnectionDTO connection;
}
