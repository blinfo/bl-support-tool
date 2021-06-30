package se.bjornlunden.blappadminapi.dto.blaapi;

import lombok.Data;

@Data
public class CloudCompanyDTO {
    private Long id;
    private String databaseName;
    private String bleLicenceKey;
    private String publicKey;
    private String systemNote;
    private String hidden;
    private String createTime;
    private Integer active;
    private String deletionInformation;
    private Long payingCustomerNumber;
    private Long firmCustomerNumber;
    private Long allocatingCustomerNumber;
    private String name;
    private String orgNumber;
    private String email;
    private String role;
    private Integer hostId;
    private Long sandboxSPId;
    private String fileAreaId;
    private Boolean isConnectedToBlApp;
}
