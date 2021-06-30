package se.bjornlunden.blappadminapi.model.blapp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import se.bjornlunden.blappadminapi.enums.SystemInfoLevel;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @author Patrik Holmkvist on 2020-06-09
 */
@Entity
@Table(name = "system_info")
@Getter @Setter
@NoArgsConstructor
public class SystemInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer level;
    private Integer active;
    @Column(length = 100)
    private String icon;
    @Column(length = 100)
    private String label;
    private String message;
    @Column(name = "expire_at")
    private LocalDateTime expireAt;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public SystemInfo(
    Long id,
    Integer level,
    Boolean active,
    String icon,
    String label,
    String message,
    LocalDateTime expireAt,
    LocalDateTime createdAt
    ) {
       this.id = id;
       this.level = level;
       this.active = active ? 1 : 0;
       this.icon = icon;
       this.label = label;
       this.message = message;
       this.expireAt = expireAt;
       this.createdAt = createdAt;
    }
    public SystemInfoLevel getLevel() {
        return SystemInfoLevel.of(level);
    }

    public void setLevel(SystemInfoLevel level) {
        this.level = level.getType();
    }
}
