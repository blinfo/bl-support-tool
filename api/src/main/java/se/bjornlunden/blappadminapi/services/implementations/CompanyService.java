package se.bjornlunden.blappadminapi.services.implementations;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.model.blapp.Company;
import se.bjornlunden.blappadminapi.repositories.blapp.CompanyRepository;

import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2020-09-29
 */
@Service
@Slf4j
public class CompanyService {
    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Boolean hasBlAppConnection(String publicKey) {
        return companyRepository.existsByPublicKey(publicKey);
    }

    public Optional<Company> findCompanyByPublicKey(String publicKey) {
        return companyRepository.findByPublicKey(publicKey);
    }
}
