package se.bjornlunden.blappadminapi.enums;

/**
 * @author Patrik Holmkvist on 2021-05-19
 */
public enum PaymentType {
    COMPANY(0),
    USER(1);

    private final Integer id;

    PaymentType(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public static PaymentType of(Integer id) {
        if(id == null || id > values().length) {
            return COMPANY;
        }
        return values()[id];
    }
}
