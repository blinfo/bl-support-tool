package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blapp.ModuleStats;
import se.bjornlunden.blappadminapi.dto.blapp.SolutionStats;
import se.bjornlunden.blappadminapi.dto.blapp.SubscriptionDTO;
import se.bjornlunden.blappadminapi.dto.blapp.SubscriptionStats;
import se.bjornlunden.blappadminapi.model.blapp.Connection;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2021-05-18
 */
@Service
public class SubscriptionStatsService {
    private final SubscriptionService subscriptionService;
    private final CompanyService companyService;
    private final ConnectionService connectionService;
    private final SolutionService solutionService;
    private final ModuleStatsService moduleStatsService;
    private final UserSettingService userSettingService;

    public SubscriptionStatsService(
            SubscriptionService subscriptionService,
            CompanyService companyService,
            ConnectionService connectionService,
            SolutionService solutionService,
            ModuleStatsService moduleStatsService,
            UserSettingService userSettingService) {
        this.subscriptionService = subscriptionService;
        this.companyService = companyService;
        this.connectionService = connectionService;
        this.solutionService = solutionService;
        this.moduleStatsService = moduleStatsService;
        this.userSettingService = userSettingService;
    }

    public Optional<SubscriptionStats> getCompanySubscriptionStats(String publicKey) {
        return companyService.findCompanyByPublicKey(publicKey).map(company -> {
            List<Connection> connections = connectionService.getConnectionsByPublicKey(publicKey);
            List<SubscriptionDTO> subscriptions = getSubscriptionsFromConnections(connections);
            SubscriptionStats dto = SubscriptionStats.builder()
                    .solution(company.getSolution() != null ? solutionService.getSolutionStats(company.getSolution(), subscriptions) : new SolutionStats())
                    .modules(moduleStatsService.getModuleStats(subscriptionService.getModulesFromString(company.getModules()), subscriptions))
                    .build();
            dto.setIntegrationDiscount();
            dto.calculateSubscriptionCost();
            return dto;
        });
    }

    private List<SubscriptionDTO> getSubscriptionsFromConnections(List<Connection> connections) {
        return connections.stream()
                .parallel()
                .map(connection -> subscriptionService.getByConnectionId(connection.getId()).map(dto -> {
                    dto.setIsBlAllInclusive(userSettingService.isBlAllInclusive(connection.getUser().getId()));
                    return dto;
                }).orElse(null)).filter(Objects::nonNull).collect(Collectors.toList());
    }

    private double calculateSubscriptionCost(SubscriptionStats dto) {
        return dto.getSolution().getTotalCost() + dto.getModules().stream().mapToDouble(ModuleStats::getTotalCost).sum();
    }
}
