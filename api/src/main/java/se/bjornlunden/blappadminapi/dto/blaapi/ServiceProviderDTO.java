package se.bjornlunden.blappadminapi.dto.blaapi;

import lombok.Data;

import java.util.List;

/**
 * @author Patrik Holmkvist on 2021-04-19
 */
@Data
public class ServiceProviderDTO {
    private Long id;
    private String publicKey;
    private String name;
    private List<ScopeDTO> scopes;
    private String description;
    private String website;
    private String email;
    private String phone;
    private Short live;
}
