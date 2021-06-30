package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.bjornlunden.blappadminapi.model.blapp.Connection;
import se.bjornlunden.blappadminapi.model.blapp.User;

import java.util.List;
import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2020-09-02
 */
public interface ConnectionRepository extends JpaRepository<Connection, Long>, JpaSpecificationExecutor<Connection> {

    List<Connection> findAllByUser(User user);
    List<Connection> findAllByPublicKey(String publicKey);
    Optional<Connection> findById(Long id);
}
