package se.bjornlunden.blappadminapi.dto.blapp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


/**
 * @author Patrik Holmkvist on 2020-09-28
 */
@Data
@AllArgsConstructor @NoArgsConstructor
public class SolutionDTO {
    private Long id;
    private Double price;
    private Double pricePerUser;
    private String description;
    private String displayName;
    private List<ModuleDTO> modules;
}
