package se.bjornlunden.blappadminapi.repositories.blaapi;

import org.springframework.data.jpa.repository.JpaRepository;
import se.bjornlunden.blappadminapi.model.blaapi.UsersServiceProvider;

import java.util.List;

/**
 * @author Patrik Holmkvist on 2021-04-12
 */
public interface UsersServiceProviderRepository extends JpaRepository<UsersServiceProvider, Long> {
    List<UsersServiceProvider> findAllByUserId(Long userId);
}
