package se.bjornlunden.blappadminapi.dto.blaapi;

import lombok.Data;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2021-04-12
 */
@Data
public class ScopeDTO {
    private String service;
    private List<String> access;

    public ScopeDTO(String service, List<String> access) {
        this.service = service;
        this.access = access;
    }

    public static ScopeDTO of(String code) {
        if (code.trim().isEmpty()) {
            return null;
        }
        String[] main = code.split(":");
        return new ScopeDTO(main[0].trim(), Arrays.stream(main[1]
                .split("\\|"))
                .filter(method -> !method.equals("-"))
                .collect(Collectors.toList()));
    }
}

