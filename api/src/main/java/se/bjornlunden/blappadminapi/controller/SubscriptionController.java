package se.bjornlunden.blappadminapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.bjornlunden.blappadminapi.dto.blapp.SubscriptionDTO;
import se.bjornlunden.blappadminapi.dto.blapp.SubscriptionStats;
import se.bjornlunden.blappadminapi.services.implementations.SubscriptionService;
import se.bjornlunden.blappadminapi.services.implementations.SubscriptionStatsService;

import java.util.List;
import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2020-10-05
 */
@RestController
@RequestMapping("subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final SubscriptionStatsService subscriptionStatsService;

    public SubscriptionController(SubscriptionService subscriptionService, SubscriptionStatsService subscriptionStatsService) {
        this.subscriptionService = subscriptionService;
        this.subscriptionStatsService = subscriptionStatsService;
    }

    @GetMapping
    public List<SubscriptionDTO> getSubscriptions() {
        return subscriptionService.getSubscriptions();
    }

    @GetMapping("connection/{id}")
    public Optional<SubscriptionDTO> getByConnectionId(@PathVariable Long id) {
        return subscriptionService.getByConnectionId(id);
    }

    @GetMapping("company/stats/{publicKey}")
    public Optional<SubscriptionStats> getCompanySubscriptionByPublicKey(@PathVariable String publicKey) {
        return subscriptionStatsService.getCompanySubscriptionStats(publicKey);
    }
}
