package se.bjornlunden.blappadminapi.dto.blapp;

import lombok.Data;
import se.bjornlunden.blappadminapi.enums.ModuleType;
import se.bjornlunden.blappadminapi.enums.PaymentType;

/**
 * @author Patrik Holmkvist on 2020-09-30
 */
@Data
public class ModuleDTO {
    private Long id;
    private String displayName;
    private Double price;
    private String description;
    private PaymentType paymentType;
    private ModuleType type;
    private String icon;
}
