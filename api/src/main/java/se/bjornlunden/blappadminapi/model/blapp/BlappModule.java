package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import se.bjornlunden.blappadminapi.enums.ModuleType;
import se.bjornlunden.blappadminapi.enums.PaymentType;

import javax.persistence.*;

/**
 * @author Patrik Holmkvist on 2020-06-08
 */
@Entity
@Table(name = "module")
@Data
public class BlappModule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "parent_id")
    private Long parentId;

    @Column(name = "bla_product_id")
    private String blaProductId;

    private Double price;

    private String description;

    @Column(name = "payment_type")
    private Integer paymentType;

    private Integer type;

    private String icon;

    public PaymentType getPaymentType() {
        return PaymentType.of(this.paymentType);
    }

    public ModuleType getType() {
        return ModuleType.of(this.type);
    }
}
