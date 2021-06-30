package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import se.bjornlunden.blappadminapi.model.blapp.Subscription;

import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2020-10-05
 */
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByConnectionId(Long id);
}
