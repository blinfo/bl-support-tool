package se.bjornlunden.blappadminapi.dto.blaapi;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Patrik Holmkvist on 2021-04-12
 */
@Data
public class IntegrationDTO {
    private Long id;
    private Long userId;
    private Long payingCustomerNumber;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone = "GMT+00:00")
    private LocalDateTime createTime;
    private Short active;
    private List<ScopeDTO> scopes;
    private ServiceProviderDTO serviceProvider;
}
