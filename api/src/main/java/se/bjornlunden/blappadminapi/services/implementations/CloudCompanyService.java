package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.emailportal.EmailPortalSettingsDTO;
import se.bjornlunden.blappadminapi.model.blaapi.CloudCompany;
import se.bjornlunden.blappadminapi.repositories.blaapi.CloudCompanyRepository;
import se.bjornlunden.blappadminapi.repositories.blaapi.specification.CloudCompanySpecification;

import java.util.Arrays;
import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2021-01-27
 */
@Service
public class CloudCompanyService {

    private final CloudCompanyRepository cloudCompanyRepository;
    private final EmailPortalService emailPortalService;

    private String search;
    private String filter;

    public CloudCompanyService(CloudCompanyRepository cloudCompanyRepository, EmailPortalService emailPortalService) {
        this.cloudCompanyRepository = cloudCompanyRepository;
        this.emailPortalService = emailPortalService;
    }

    public Page<CloudCompany> getPageOfCompanies(
            Integer page,
            Integer size,
            String searchQuery,
            String sortDir,
            String sortKey,
            String filter) {
        return getCompanies(page, size, searchQuery, sortDir, sortKey, filter);
    }

    public Optional<CloudCompany> getCompany(Long id) {
        return cloudCompanyRepository.findById(id);
    }

    public Optional<CloudCompany> getCompanyByPublicKey(String publicKey) {
        return cloudCompanyRepository.findByPublicKey(publicKey);
    }

    private Page<CloudCompany> getCompanies(
            Integer page,
            Integer size,
            String searchQuery,
            String sortDir,
            String sortKey,
            String filter) {
        Sort sort = Sort.by(!sortDir.equals("desc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortKey);
        Pageable pageable = PageRequest.of(page, size, sort);
        this.search = searchQuery;
        this.filter = filter;

        if (filter != null && filter.equals("emailPortalAddress")) {
            getPublicKeyFromEmailPortalSettings(searchQuery).ifPresentOrElse(settings -> {
                this.search = settings.getPublicKey();
                this.filter = "publicKey";
            }, () -> {
                this.search = searchQuery;
                this.filter = "";
            });
        }
        CloudCompanySpecification companySpecification = new CloudCompanySpecification(this.search, this.filter);
        return cloudCompanyRepository.findAll(companySpecification, pageable);
    }

    private Optional<EmailPortalSettingsDTO> getPublicKeyFromEmailPortalSettings(String email) {
        return Arrays.stream(emailPortalService.getSettingsByEmail(email)).findFirst();
    }


    public Optional<String> getSimpleCredentials(String publicKey) {
        return cloudCompanyRepository.findByPublicKey(publicKey)
                .map(company ->
                        String.format("%s,%s,%s", company.getDatabaseName(), company.getUserId(), company.getBlaPassword()));
    }
}
