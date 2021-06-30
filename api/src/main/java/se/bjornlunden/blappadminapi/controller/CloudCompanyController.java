package se.bjornlunden.blappadminapi.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.bjornlunden.blappadminapi.dto.blaapi.CloudCompanyDTO;
import se.bjornlunden.blappadminapi.services.DaoFactory;
import se.bjornlunden.blappadminapi.services.implementations.CloudCompanyService;
import se.bjornlunden.blappadminapi.services.implementations.CompanyService;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("companies")
public class CloudCompanyController {

    private final CloudCompanyService cloudCompanyService;
    private final CompanyService companyService;
    private final DaoFactory daoFactory;

    public CloudCompanyController(CloudCompanyService cloudCompanyService, CompanyService companyService, DaoFactory daoFactory) {
        this.cloudCompanyService = cloudCompanyService;
        this.companyService = companyService;
        this.daoFactory = daoFactory;
    }

    @GetMapping
    public Page<CloudCompanyDTO> getCompanies(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "25") Integer size,
            @RequestParam(value = "search", required = false) String searchQuery,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir,
            @RequestParam(value = "sortKey", defaultValue = "id") String sortKey,
            @RequestParam(value = "filter", required = false) String filter
    ) {
        Sort sort = Sort.by(!sortDir.equals("desc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortKey);
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<CloudCompanyDTO> companies = cloudCompanyService.getPageOfCompanies(page, size, searchQuery, sortDir, sortKey, filter).map(daoFactory::toDTO);
        return PageableExecutionUtils.getPage(
                companies.getContent().stream().parallel().map(this::getBlAppConnection).collect(Collectors.toList()),
                pageable,
                companies::getTotalElements
        );
    }

    @GetMapping("{id}")
    public CloudCompanyDTO getCompany(@PathVariable() Long id) {
        return cloudCompanyService.getCompany(id)
                .map(daoFactory::toDTO)
                .map(this::getBlAppConnection)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Kunde inte hitta företag med id " + id));
    }

    private CloudCompanyDTO getBlAppConnection(CloudCompanyDTO companyDTO) {
        companyDTO.setIsConnectedToBlApp(this.companyService.hasBlAppConnection(companyDTO.getPublicKey()));
        return companyDTO;
    }
}
