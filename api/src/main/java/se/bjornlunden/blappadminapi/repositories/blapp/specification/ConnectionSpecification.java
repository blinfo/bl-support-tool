package se.bjornlunden.blappadminapi.repositories.blapp.specification;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.Specification;
import se.bjornlunden.blappadminapi.model.blapp.Connection;
import se.bjornlunden.blappadminapi.services.implementations.SpecificationService;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Patrik Holmkvist on 2020-11-11
 */
@Setter @AllArgsConstructor @NoArgsConstructor
public class ConnectionSpecification implements Specification<Connection> {
    private String searchQuery;

    @Override
    public Predicate toPredicate(Root<Connection> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();

        if (!SpecificationService.isNullOrEmpty(searchQuery)) {
            if (SpecificationService.isNumeric(searchQuery)) {
                predicates.add(cb.like(root.get("id").as(String.class), "%" + searchQuery + "%"));
                predicates.add(cb.like(root.get("cloudUserId").as(String.class), "%" + searchQuery + "%"));
            }
            predicates.add(cb.like(root.get("publicKey"), "%" + searchQuery + "%"));
            predicates.add(cb.like(root.get("email"), "%" + searchQuery + "%"));
            return cb.or(predicates.toArray(new Predicate[0]));
        }
        return null;
    }
}
