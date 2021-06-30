package se.bjornlunden.blappadminapi.repositories.blapp.specification;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import se.bjornlunden.blappadminapi.model.blapp.SystemInfo;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

@AllArgsConstructor
public class SystemInfoSpecification implements Specification<SystemInfo> {
    private String searchQuery;
    private String key;
    private String operation;

    @Override
    public Predicate toPredicate(Root<SystemInfo> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        if(operation == null || searchQuery == null || key == null){
            return  null;
        }
        if(operation.equalsIgnoreCase(">")){
            return cb.greaterThanOrEqualTo(root.<String> get(key), searchQuery);
        }
        if(operation.equalsIgnoreCase("<")){
            return cb.lessThanOrEqualTo(root.<String> get(key), searchQuery);
        }
        if(operation.equalsIgnoreCase(":")){
            return cb.equal(root.<String> get(key), searchQuery);
        }
        return null;
    }
}
