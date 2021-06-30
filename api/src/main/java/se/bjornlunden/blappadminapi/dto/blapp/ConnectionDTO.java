package se.bjornlunden.blappadminapi.dto.blapp;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Patrik Holmkvist on 2020-06-10
 */
@Getter @Setter
public class ConnectionDTO {
    private Long id;
    private String publicKey;
    private String email;
    private String companyName;
    private Long cloudUserId;
}
