package se.bjornlunden.blappadminapi.repositories.blaapi.specification;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.Specification;
import se.bjornlunden.blappadminapi.model.blaapi.CloudCompany;
import se.bjornlunden.blappadminapi.services.implementations.SpecificationService;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Patrik Holmkvist on 2021-02-01
 */
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CloudCompanySpecification implements Specification<CloudCompany> {
    private String searchQuery;
    private String filter;

    @Override
    public Predicate toPredicate(Root<CloudCompany> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();

        if (!SpecificationService.isNullOrEmpty(searchQuery)) {
            if (checkIfValidColumn(filter)) {
                return cb.like(root.get(filter).as(String.class), searchQuery);
            }

            if (SpecificationService.isNumeric(searchQuery)) {
                predicates.add(cb.like(root.get("id").as(String.class), "%" + searchQuery + "%"));
                predicates.add(cb.like(root.get("payingCustomerNumber").as(String.class), "%" + searchQuery + "%"));
                predicates.add(cb.like(root.get("firmCustomerNumber").as(String.class), "%" + searchQuery + "%"));
                predicates.add(cb.like(root.get("allocatingCustomerNumber").as(String.class), "%" + searchQuery + "%"));
            }
            predicates.add(cb.like(root.get("publicKey").as(String.class), "%" + searchQuery + "%"));
            predicates.add(cb.like(root.get("name"), "%" + searchQuery + "%"));
            return cb.or(predicates.toArray(new Predicate[0]));
        }
        return null;
    }

    private boolean checkIfValidColumn(String filter) {
        List<String> columns = new ArrayList<>() {
            {
                add("id");
                add("payingCustomerNumber");
                add("firmCustomerNumber");
                add("allocatingCustomerNumber");
                add("publicKey");
            }
        };
        return columns.contains(filter);
    }


}
