package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blapp.ModuleDTO;
import se.bjornlunden.blappadminapi.dto.blapp.ModuleStats;
import se.bjornlunden.blappadminapi.dto.blapp.SubscriptionDTO;
import se.bjornlunden.blappadminapi.enums.ModuleType;
import se.bjornlunden.blappadminapi.enums.PaymentType;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author Patrik Holmkvist on 2021-05-19
 */
@Service
public class ModuleStatsService {


    public List<ModuleStats> getModuleStats(List<ModuleDTO> companyModules, List<SubscriptionDTO> subscriptions) {
        return Stream.concat(subscriptions.stream()
                .map(SubscriptionDTO::getModules)
                .flatMap(List::stream)
                .distinct()
                .filter(moduleDTO -> moduleDTO.getType() == ModuleType.INTERNAL)
                .map(module -> {
                    Long subscribersCount = getSubscribersCount(module, subscriptions);
                    Long allInclusiveCount = getAllInclusiveUsers(module, subscriptions);
                    return ModuleStats.builder()
                            .id(module.getId())
                            .name(module.getDisplayName())
                            .price(module.getPrice())
                            .paymentType(module.getPaymentType())
                            .type(module.getType())
                            .subscribers(subscribersCount)
                            .allInclusiveSubscribers(allInclusiveCount)
                            .totalCost(calculateCost(module, subscribersCount, allInclusiveCount))
                            .build();
                }), companyModules.stream()
                .filter(module -> module.getType() == ModuleType.INTEGRATION)
                .map(this::getIntegrationsStats)).collect(Collectors.toList());
    }

    public ModuleStats getIntegrationsStats(ModuleDTO module) {
        return ModuleStats.builder()
                .id(module.getId())
                .name(module.getDisplayName())
                .price(module.getPrice())
                .type(module.getType())
                .paymentType(module.getPaymentType())
                .totalCost(module.getPrice())
                .build();
    }

    private Long getSubscribersCount(ModuleDTO module, List<SubscriptionDTO> subscriptions) {
        return subscriptions.stream().filter(subscription -> subscription.getModules().contains(module)).count();
    }

    private Long getAllInclusiveUsers(ModuleDTO module, List<SubscriptionDTO> subscriptions) {
        return subscriptions.stream().filter(subscription -> subscription.getIsBlAllInclusive() && subscription.getModules().contains(module)).count();
    }

    private Double calculateCost(ModuleDTO module, Long subscribers, Long allInclusive) {
        long count = subscribers - allInclusive > 0 ? subscribers - allInclusive : 0L;
        return module.getPaymentType() == PaymentType.USER ? count * module.getPrice() : count > 0 ? module.getPrice() : 0;
    }
}
