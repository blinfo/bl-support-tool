package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import se.bjornlunden.blappadminapi.model.blapp.BlappModule;

/**
 * @author Patrik Holmkvist on 2020-10-07
 */
public interface ModuleRepository extends JpaRepository<BlappModule, Long> {
}
