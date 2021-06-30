package se.bjornlunden.blappadminapi.dto.blapp;
import lombok.Data;

import java.util.List;

/**
 * @author Patrik Holmkvist on 2020-09-28
 */
@Data
public class SubscriptionDTO {
    private SolutionDTO solution;
    private List<ModuleDTO> modules;
    private Boolean isBlAllInclusive;
}
