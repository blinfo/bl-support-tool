package se.bjornlunden.blappadminapi.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blaapi.IntegrationDTO;
import se.bjornlunden.blappadminapi.model.blaapi.UsersServiceProvider;
import se.bjornlunden.blappadminapi.repositories.blaapi.UsersServiceProviderRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2021-04-12
 */
@Service
public class IntegrationService {
    private final ServiceProviderService serviceProviderService;
    private final UsersServiceProviderRepository usersServiceProviderRepository;
    private final ModelMapper modelMapper;

    public IntegrationService(ServiceProviderService serviceProvider, UsersServiceProviderRepository usersServiceProviderRepository, ModelMapper modelMapper) {
        this.serviceProviderService = serviceProvider;
        this.usersServiceProviderRepository = usersServiceProviderRepository;
        this.modelMapper = modelMapper;
    }

    public List<IntegrationDTO> getConnectedIntegrationToCompany(Long companyId) {
        return usersServiceProviderRepository.findAllByUserId(companyId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    private IntegrationDTO toDTO(UsersServiceProvider provider) {
        IntegrationDTO integrationDTO = modelMapper.map(provider, IntegrationDTO.class);
        integrationDTO.setScopes(ScopeService.getScopes(provider.getAvailableScopes()));
        integrationDTO.setServiceProvider(serviceProviderService.getServiceProvider(provider.getServiceProviderId()));
        return integrationDTO;
    }
}
