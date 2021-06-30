package se.bjornlunden.blappadminapi.enums;

/**
 * @author Patrik Holmkvist on 2021-05-19
 */
public enum ModuleType {
    INTERNAL(0),
    INTEGRATION(1);

    private final Integer id;

    ModuleType(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public static ModuleType of(Integer id) {
        if(id == null || id > values().length) {
            return INTERNAL;
        }
        return values()[id];
    }
}
