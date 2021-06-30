package se.bjornlunden.blappadminapi.repositories.blapp.specification;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.Specification;
import se.bjornlunden.blappadminapi.model.blapp.User;
import se.bjornlunden.blappadminapi.services.implementations.SpecificationService;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Patrik Holmkvist on 2020-10-07
 */
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSpecification implements Specification<User> {
    private String searchQuery;

    @Override
    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();

        if (!SpecificationService.isNullOrEmpty(searchQuery)) {
            if (SpecificationService.isNumeric(searchQuery)) {
                predicates.add(cb.like(root.get("id").as(String.class), "%" + searchQuery + "%"));
            }
            predicates.add(cb.like(root.get("name"), "%" + searchQuery + "%"));
            predicates.add(cb.like(root.get("pin"), "%" + searchQuery + "%"));
            return cb.or(predicates.toArray(new Predicate[0]));
        }
        return null;
    }
}
