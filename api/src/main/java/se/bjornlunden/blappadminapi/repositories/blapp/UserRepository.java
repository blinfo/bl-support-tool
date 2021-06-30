package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.bjornlunden.blappadminapi.model.blapp.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


/**
 * @author Patrik Holmkvist on 2020-06-10
 */
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Integer countAllByLastLoginAfter(LocalDateTime date);
    List<User> findAllByLastLoginAfter(LocalDateTime date);

    Integer countAllByCreatedAtAfter(LocalDateTime date);
    List<User> findAllByCreatedAtAfter(LocalDateTime date);

    List<User> findAllByCreatedAtAfterAndCreatedAtBefore(LocalDateTime start, LocalDateTime end);

    Optional<User> findByPin(String pin);
}
