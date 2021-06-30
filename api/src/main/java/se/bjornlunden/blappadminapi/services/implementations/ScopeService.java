package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blaapi.ScopeDTO;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author Patrik Holmkvist on 2021-04-12
 */
@Service
public class ScopeService {

    public static List<ScopeDTO> getScopes(String source) {
        return Stream.of(
                source.replace("[", "")
                .replace("]", "")
                .split(","))
                .map(ScopeDTO::of)
                .collect(Collectors.toList());
    }
}
