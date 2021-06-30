package se.bjornlunden.blappadminapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.bjornlunden.blappadminapi.dto.blapp.ModuleDTO;
import se.bjornlunden.blappadminapi.dto.blapp.SolutionDTO;
import se.bjornlunden.blappadminapi.services.implementations.SolutionService;

import java.util.List;

/**
 * @author Patrik Holmkvist on 2021-04-30
 */
@RestController
@RequestMapping("solutions")
public class SolutionController {

    private final SolutionService solutionService;

    public SolutionController(SolutionService solutionService) {
        this.solutionService = solutionService;
    }

    @GetMapping
    public List<SolutionDTO> getAll() {
        return solutionService.getAll();
    }

    @GetMapping("modules")
    public List<ModuleDTO> getModules() {
        return solutionService.getModules();
    }
}
