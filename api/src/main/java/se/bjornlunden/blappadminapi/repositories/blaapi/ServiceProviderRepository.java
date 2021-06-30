package se.bjornlunden.blappadminapi.repositories.blaapi;

import org.springframework.data.jpa.repository.JpaRepository;
import se.bjornlunden.blappadminapi.model.blaapi.ServiceProvider;

import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2021-04-19
 */
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {
    Optional<ServiceProvider> findById(Long id);
}
