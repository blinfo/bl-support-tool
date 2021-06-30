package se.bjornlunden.blappadminapi.security;

import lombok.Builder;
import lombok.Data;

/**
 * @author Patrik Holmkvist on 2021-04-30
 */
@Data
@Builder
public class BlaApiProperties {
    private String clientId;
    private String clientSecret;
    private String tokenUrl;
}
