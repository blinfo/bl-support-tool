package se.bjornlunden.blappadminapi.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blaapi.ServiceProviderDTO;
import se.bjornlunden.blappadminapi.model.blaapi.ServiceProvider;
import se.bjornlunden.blappadminapi.repositories.blaapi.ServiceProviderRepository;

/**
 * @author Patrik Holmkvist on 2021-04-19
 */
@Service
public class ServiceProviderService {
    private final ServiceProviderRepository serviceProviderRepository;
    private final ModelMapper modelMapper;

    public ServiceProviderService(ServiceProviderRepository serviceProviderRepository, ModelMapper modelMapper) {
        this.serviceProviderRepository = serviceProviderRepository;
        this.modelMapper = modelMapper;
    }

    public ServiceProviderDTO getServiceProvider(Long id) {
        return serviceProviderRepository.findById(id).map(this::toDTO).orElse(null);
    }

    private ServiceProviderDTO toDTO(ServiceProvider provider) {
        return modelMapper.map(provider, ServiceProviderDTO.class);
    }
}
