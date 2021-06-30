package se.bjornlunden.blappadminapi.dto.blapp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author Patrik Holmkvist on 2020-10-02
 */
@Data
public class UserDTO {
    private Long id;
    private String name;
    @JsonProperty("socialSecurityNumber")
    private String pin;
    private String profilePictureUrl;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone = "GMT+00:00")
    private LocalDateTime lastLogin;
    private Boolean blAllInclusive;
}
