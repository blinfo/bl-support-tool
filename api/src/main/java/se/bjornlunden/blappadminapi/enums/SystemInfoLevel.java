package se.bjornlunden.blappadminapi.enums;

public enum SystemInfoLevel {
        INFO(0),
        BETA(1),
        WARNING(2);

        private final Integer type;

        SystemInfoLevel(Integer type){
            this.type = type;
        }

    public Integer getType() {
        return type;
    }

    public static SystemInfoLevel of(Integer type){
            if(type == null || type >= values().length) {
                return INFO;
            }
            return values()[type];
    }
}
