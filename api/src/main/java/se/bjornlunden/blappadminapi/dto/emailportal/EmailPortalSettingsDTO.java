package se.bjornlunden.blappadminapi.dto.emailportal;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EmailPortalSettingsDTO {
    private int id;
    private String emailPortalAddress;
    private boolean confirmationEmailsEnabled;
    private List<CustomerEmailAddressDTO> customerEmailAddresses = new ArrayList<>();
    private String publicKey;
}
