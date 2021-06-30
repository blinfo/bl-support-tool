package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import se.bjornlunden.blappadminapi.model.blapp.Property;

import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2021-06-07
 */
public interface PropertyRepository extends JpaRepository<Property, Long> {
    Optional<Property> findByKey(String key);
}
