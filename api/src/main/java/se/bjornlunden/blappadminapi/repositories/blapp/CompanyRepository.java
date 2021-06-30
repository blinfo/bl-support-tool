package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.bjornlunden.blappadminapi.model.blapp.Company;

import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2020-09-29
 */
public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {
    Boolean existsByPublicKey(String publicKey);
    Optional<Company> findByPublicKey(String publicKey);
}
