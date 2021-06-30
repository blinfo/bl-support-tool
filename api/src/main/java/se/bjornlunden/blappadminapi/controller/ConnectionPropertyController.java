package se.bjornlunden.blappadminapi.controller;

import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.bjornlunden.blappadminapi.dto.blapp.ConnectionPropertyDTO;
import se.bjornlunden.blappadminapi.services.DaoFactory;
import se.bjornlunden.blappadminapi.services.DomainFactory;
import se.bjornlunden.blappadminapi.services.implementations.ConnectionPropertyService;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2020-09-04
 */
@RestController
@RequestMapping("connection-properties")
public class ConnectionPropertyController {
    private final ConnectionPropertyService connectionPropertyService;
    private final DaoFactory daoFactory;
    private final DomainFactory domainFactory;

    public ConnectionPropertyController(
            ConnectionPropertyService connectionPropertyService,
            DaoFactory daoFactory, DomainFactory domainFactory) {
        this.connectionPropertyService = connectionPropertyService;
        this.daoFactory = daoFactory;
        this.domainFactory = domainFactory;
    }


    @GetMapping()
    public List<ConnectionPropertyDTO> getConnectionProperties() {
        return connectionPropertyService.getAllConnectionProperties()
                .stream().map(daoFactory::toDTO).collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public ConnectionPropertyDTO getConnectionProperty(@PathVariable long id) {
        throw new NotYetImplementedException("Kommer snart");
    }

    @PostMapping()
    @RolesAllowed({"Admin", "Dev"})
    public Optional<ConnectionPropertyDTO> saveConnectionProperty(@RequestBody ConnectionPropertyDTO connectionProperty) {
        return connectionPropertyService.save(domainFactory.toDomain(connectionProperty)).map(daoFactory::toDTO);
    }

    @PutMapping("{id}")
    @RolesAllowed({"Admin", "Dev"})
    public ConnectionPropertyDTO editConnectionProperty(
            @PathVariable long id,
            @RequestBody ConnectionPropertyDTO connectionProperty) {
        return connectionPropertyService.update(domainFactory.toDomain(connectionProperty), id)
                .map(daoFactory::toDTO)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Kunde inte uppdatera connectionProperty med id " + id
                ));
    }

    @DeleteMapping("{id}")
    @RolesAllowed({"Admin", "Dev"})
    public void delete(@PathVariable long id) {
        connectionPropertyService.delete(id);
    }

}
