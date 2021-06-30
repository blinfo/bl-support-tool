package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import se.bjornlunden.blappadminapi.model.blapp.Connection;
import se.bjornlunden.blappadminapi.model.blapp.ConnectionProperty;

import java.util.List;
import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2020-09-04
 */
public interface ConnectionPropertyRepository extends JpaRepository<ConnectionProperty, Long> {
    List<ConnectionProperty> findByConnection(Connection connection);
    List<ConnectionProperty> findByConnection_Id(Long id);
    Optional<ConnectionProperty> findById(Long id);
}
