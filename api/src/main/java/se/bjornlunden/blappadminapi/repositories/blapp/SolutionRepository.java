package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import se.bjornlunden.blappadminapi.model.blapp.Solution;

/**
 * @author Patrik Holmkvist on 2021-05-03
 */
public interface SolutionRepository extends JpaRepository<Solution, Long> {
}
