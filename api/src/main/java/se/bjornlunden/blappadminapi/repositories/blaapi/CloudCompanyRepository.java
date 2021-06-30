package se.bjornlunden.blappadminapi.repositories.blaapi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.bjornlunden.blappadminapi.model.blaapi.CloudCompany;

import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2021-01-27
 */
public interface CloudCompanyRepository extends JpaRepository<CloudCompany, Long>, JpaSpecificationExecutor<CloudCompany> {
    Optional<CloudCompany> findById(Long id);
    Optional<CloudCompany> findByPublicKey(String publicKey);
}
