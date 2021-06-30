package se.bjornlunden.blappadminapi.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blaapi.CloudCompanyDTO;
import se.bjornlunden.blappadminapi.dto.blapp.*;
import se.bjornlunden.blappadminapi.model.blaapi.CloudCompany;
import se.bjornlunden.blappadminapi.model.blapp.*;

/**
 * @author Patrik Holmkvist on 2021-04-30
 */
@Service
public class DaoFactory {
    private final ModelMapper modelMapper;

    public DaoFactory(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CloudCompanyDTO toDTO(CloudCompany company) {
        return modelMapper.map(company, CloudCompanyDTO.class);
    }

    public SolutionDTO toDTO(Solution solution) {
        if (solution == null) {
            return new SolutionDTO();
        }
        SolutionDTO dto = modelMapper.map(solution, SolutionDTO.class);
        return dto;
    }

    public ModuleDTO toDTO(BlappModule module) {
        return modelMapper.map(module, ModuleDTO.class);
    }

    public SubscriptionDTO toDTO(Subscription subscription) {
        return modelMapper.map(subscription, SubscriptionDTO.class);
    }

    public ConnectionPropertyDTO toDTO(ConnectionProperty connectionProperty) {
        return modelMapper.map(connectionProperty, ConnectionPropertyDTO.class);
    }

    public PropertyDTO toDTO(Property property) {
        return modelMapper.map(property, PropertyDTO.class);
    }
}
