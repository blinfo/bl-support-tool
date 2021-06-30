package se.bjornlunden.blappadminapi.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import se.bjornlunden.blappadminapi.dto.blapp.ConnectionDTO;
import se.bjornlunden.blappadminapi.dto.blapp.ConnectionPropertyDTO;
import se.bjornlunden.blappadminapi.services.DaoFactory;
import se.bjornlunden.blappadminapi.services.implementations.ConnectionService;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2020-09-02
 */
@RestController
@RequestMapping("connections")
public class ConnectionController {
    private final ConnectionService connectionService;
    private final DaoFactory daoFactory;

    public ConnectionController(ConnectionService connectionService, DaoFactory daoFactory) {
        this.connectionService = connectionService;
        this.daoFactory = daoFactory;
    }

    @GetMapping
    public Page<ConnectionDTO> getConnections(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "25") Integer size,
            @RequestParam(value = "search", required = false) String searchQuery,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir,
            @RequestParam(value = "sortKey", defaultValue = "id") String sortKey
    ) {
        return connectionService.getConnections(page, size, searchQuery, sortDir, sortKey);
    }

    @GetMapping("user")
    public List<ConnectionDTO> getConnectionByUserId(@RequestParam("id") Long userId) {
        return connectionService.getConnectionsByUser(userId).orElse(Collections.emptyList());
    }

    @GetMapping("properties/{connectionId}")
    public List<ConnectionPropertyDTO> getPropertiesByConnectionId(@PathVariable Long connectionId) {
        return connectionService.getPropertiesByConnectionId(connectionId).stream().map(daoFactory::toDTO).collect(Collectors.toList());
    }
}
