package se.bjornlunden.blappadminapi.controller;

import org.springframework.web.bind.annotation.*;
import se.bjornlunden.blappadminapi.dto.blaapi.IntegrationDTO;
import se.bjornlunden.blappadminapi.services.implementations.IntegrationService;

import java.util.List;

/**
 * @author Patrik Holmkvist on 2021-04-14
 */
@RestController
@RequestMapping("integrations")
public class IntegrationController {
    private final IntegrationService integrationService;

    public IntegrationController(IntegrationService integrationService) {
        this.integrationService = integrationService;
    }

    @GetMapping()
    public List<IntegrationDTO> getAllByCompanyId(
            @RequestParam(value = "companyId") Long id) {
        return integrationService.getConnectedIntegrationToCompany(id);
    }
}
