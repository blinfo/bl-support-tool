package se.bjornlunden.blappadminapi.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blapp.ConnectionPropertyDTO;
import se.bjornlunden.blappadminapi.model.blapp.ConnectionProperty;

/**
 * @author Patrik Holmkvist on 2021-05-24
 */
@Service
public class DomainFactory {
    private final ModelMapper modelMapper;

    public DomainFactory(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ConnectionProperty toDomain(ConnectionPropertyDTO dto) {
        return modelMapper.map(dto, ConnectionProperty.class);
    }
}
