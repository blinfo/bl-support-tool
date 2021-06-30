package se.bjornlunden.blappadminapi.dto.blapp;

import lombok.Builder;
import lombok.Data;
import se.bjornlunden.blappadminapi.enums.ModuleType;
import se.bjornlunden.blappadminapi.enums.PaymentType;

/**
 * @author Patrik Holmkvist on 2021-05-18
 */
@Data
@Builder
public class ModuleStats {
    private Long id;
    private String name;
    private Double price;
    private PaymentType paymentType;
    private ModuleType type;
    private Long subscribers;
    private Long allInclusiveSubscribers;
    private Double totalCost;
}
