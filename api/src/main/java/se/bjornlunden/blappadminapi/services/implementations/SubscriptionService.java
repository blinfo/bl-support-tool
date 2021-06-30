package se.bjornlunden.blappadminapi.services.implementations;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blapp.ModuleDTO;
import se.bjornlunden.blappadminapi.dto.blapp.SubscriptionDTO;
import se.bjornlunden.blappadminapi.repositories.blapp.*;
import se.bjornlunden.blappadminapi.services.DaoFactory;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2020-10-05
 */
@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final ModuleRepository moduleRepository;
    private final DaoFactory daoFactory;

    public SubscriptionService(
            SubscriptionRepository subscriptionRepository,
            ModuleRepository moduleRepository,
            DaoFactory daoFactory) {
        this.subscriptionRepository = subscriptionRepository;
        this.moduleRepository = moduleRepository;
        this.daoFactory = daoFactory;
    }

    public List<SubscriptionDTO> getSubscriptions() {
        return subscriptionRepository.findAll().stream().map(daoFactory::toDTO).collect(Collectors.toList());
    }

    public Optional<SubscriptionDTO> getByConnectionId(Long id) {
        return subscriptionRepository.findByConnectionId(id).map(daoFactory::toDTO);
    }

    public List<ModuleDTO> getModulesFromString(String stringArray) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<Integer> ids = objectMapper.readValue(stringArray, List.class);
            return ids.stream().map(id -> daoFactory.toDTO(moduleRepository.getOne(id.longValue()))).collect(Collectors.toList());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return Collections.EMPTY_LIST;
        }
    }
}
