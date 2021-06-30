package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blapp.ModuleDTO;
import se.bjornlunden.blappadminapi.dto.blapp.SolutionDTO;
import se.bjornlunden.blappadminapi.dto.blapp.SolutionStats;
import se.bjornlunden.blappadminapi.dto.blapp.SubscriptionDTO;
import se.bjornlunden.blappadminapi.model.blapp.Solution;
import se.bjornlunden.blappadminapi.repositories.blapp.ModuleRepository;
import se.bjornlunden.blappadminapi.repositories.blapp.SolutionRepository;
import se.bjornlunden.blappadminapi.services.DaoFactory;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2021-04-30
 */
@Service
public class SolutionService {
    private final SolutionRepository solutionRepository;
    private final ModuleRepository moduleRepository;
    private final DaoFactory daoFactory;

    public SolutionService(SolutionRepository solutionRepository, ModuleRepository moduleRepository, DaoFactory daoFactory) {
        this.solutionRepository = solutionRepository;
        this.moduleRepository = moduleRepository;
        this.daoFactory = daoFactory;
    }

    public List<SolutionDTO> getAll() {
        return solutionRepository.findAll().stream().map(daoFactory::toDTO).collect(Collectors.toList());
    }

    public List<ModuleDTO> getModules() {
        return moduleRepository.findAll().stream().map(daoFactory::toDTO).collect(Collectors.toList());
    }

    public SolutionStats getSolutionStats(Solution solution, List<SubscriptionDTO> subscriptions) {
        Long subscribersCount = getSolutionSubscribersCount(subscriptions);
        Long allInclusiveCount = getAllInclusiveCount(subscriptions);
        return new SolutionStats(
                solution.getId(),
                solution.getDisplayName(),
                solution.getPrice(),
                solution.getPricePerUser(),
                subscribersCount,
                allInclusiveCount,
                getTotalSolutionCost(
                        solution.getPrice(),
                        solution.getPricePerUser(),
                        subscribersCount - allInclusiveCount)
        );
    }

    private Double getTotalSolutionCost(Double basePrice, Double price, Long subscribers) {
        return subscribers > 0 ? basePrice + price * (subscribers - 1) : 0;
    }

    private Long getSolutionSubscribersCount(List<SubscriptionDTO> subscriptions) {
        return subscriptions.stream().filter(subscription -> subscription.getSolution() != null).count();
    }

    private Long getAllInclusiveCount(List<SubscriptionDTO> subscriptions) {
        return subscriptions.stream().filter(subscription -> subscription.getIsBlAllInclusive() && subscription.getSolution() != null).count();
    }
}
