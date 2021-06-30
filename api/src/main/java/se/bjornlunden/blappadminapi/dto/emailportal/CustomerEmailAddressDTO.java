package se.bjornlunden.blappadminapi.dto.emailportal;

import lombok.Data;

@Data
public class CustomerEmailAddressDTO {
    private int id;
    private String emailAddress;
    private String type;
}
