package se.bjornlunden.blappadminapi.controller;

import org.springframework.web.bind.annotation.*;
import se.bjornlunden.blappadminapi.services.implementations.CloudCompanyService;

import javax.annotation.security.RolesAllowed;
import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2021-06-22
 */
@RestController

@RequestMapping("dev-secret")
public class DevSecretController {
    private final CloudCompanyService cloudCompanyService;

    public DevSecretController(CloudCompanyService cloudCompanyService) {
        this.cloudCompanyService = cloudCompanyService;
    }

    @GetMapping
    @RolesAllowed({"Admin", "Dev"})
    public Optional<String> getSimpleCredentials(@RequestParam String publicKey) {
        return cloudCompanyService.getSimpleCredentials(publicKey);
    }
}
