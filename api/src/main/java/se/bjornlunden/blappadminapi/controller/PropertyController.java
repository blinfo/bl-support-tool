package se.bjornlunden.blappadminapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.bjornlunden.blappadminapi.dto.blapp.PropertyDTO;
import se.bjornlunden.blappadminapi.services.DaoFactory;
import se.bjornlunden.blappadminapi.services.implementations.PropertyService;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2021-06-07
 */
@RestController
@RequestMapping("properties")
public class PropertyController {

    private final PropertyService propertyService;
    private final DaoFactory daoFactory;

    public PropertyController(PropertyService propertyService, DaoFactory daoFactory) {
        this.propertyService = propertyService;
        this.daoFactory = daoFactory;
    }

    @GetMapping
    public List<PropertyDTO> findAll() {
        return propertyService.findAll().stream().map(daoFactory::toDTO).collect(Collectors.toList());
    }
}
