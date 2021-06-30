package se.bjornlunden.blappadminapi.dto.blapp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Patrik Holmkvist on 2020-09-04
 */
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class PropertyDTO {
    private String key;
    private String dataType;
}
