package se.bjornlunden.blappadminapi.dto.blapp;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2021-05-18
 */
@Data @Builder
public class SubscriptionStats {
    private SolutionStats solution;
    private List<ModuleStats> modules;
    private Double integrationDiscount;
    private Double subscriptionCost = 0D;

    public void setIntegrationDiscount() {
        List<ModuleStats> integrationDiscountCombo = modules.stream()
                .filter(module -> module.getId() == 25L || module.getId() == 26L).collect(Collectors.toList());
            integrationDiscount = integrationDiscountCombo.size() == 2 ? -9D : 0D;
    }

    public void calculateSubscriptionCost() {
        subscriptionCost = solution.getTotalCost() + modules.stream().mapToDouble(ModuleStats::getTotalCost).sum() + integrationDiscount;
    }
}
