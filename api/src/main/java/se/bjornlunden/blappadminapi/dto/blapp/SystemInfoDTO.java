package se.bjornlunden.blappadminapi.dto.blapp;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.bjornlunden.blappadminapi.enums.SystemInfoLevel;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SystemInfoDTO {
    private Long id;
    private SystemInfoLevel level;
    private Integer active;
    private String icon;
    private String label;
    private String message;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime expireAt;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime createdAt;
}
