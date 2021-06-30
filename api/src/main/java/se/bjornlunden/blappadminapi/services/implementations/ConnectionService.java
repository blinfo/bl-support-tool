package se.bjornlunden.blappadminapi.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blapp.ConnectionDTO;
import se.bjornlunden.blappadminapi.model.blapp.Connection;
import se.bjornlunden.blappadminapi.model.blapp.ConnectionProperty;
import se.bjornlunden.blappadminapi.model.blapp.User;
import se.bjornlunden.blappadminapi.repositories.blaapi.CloudCompanyRepository;
import se.bjornlunden.blappadminapi.repositories.blapp.ConnectionRepository;
import se.bjornlunden.blappadminapi.repositories.blapp.UserRepository;
import se.bjornlunden.blappadminapi.repositories.blapp.specification.ConnectionSpecification;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2020-09-02
 */
@Service
public class ConnectionService {

    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;
    private final ConnectionPropertyService connectionPropertyService;
    private final CloudCompanyRepository cloudCompanyRepository;
    private final ModelMapper modelMapper;

    public ConnectionService(ConnectionRepository connectionRepository, UserRepository userRepository, ConnectionPropertyService connectionPropertyService, CloudCompanyRepository cloudCompanyRepository, ModelMapper modelMapper) {
        this.connectionRepository = connectionRepository;
        this.userRepository = userRepository;
        this.connectionPropertyService = connectionPropertyService;
        this.cloudCompanyRepository = cloudCompanyRepository;
        this.modelMapper = modelMapper;
    }

    public Page<ConnectionDTO> getConnections(
            Integer page,
            Integer size,
            String searchQuery,
            String sortDir,
            String sortKey
    ) {
        Sort sort = Sort.by(!sortDir.equals("desc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortKey);
        Pageable pageable = PageRequest.of(page, size, sort);
        ConnectionSpecification connectionSpecification = new ConnectionSpecification(searchQuery);
        return connectionRepository.findAll(connectionSpecification, pageable).map(this::ConnectionToDTO);
    }

    public Optional<List<ConnectionDTO>> getConnectionsByUser(Long userId) {
        return getUser(userId).map(user -> connectionRepository.findAllByUser(user).stream().parallel().map(this::ConnectionToDTOWithCompanyName).collect(Collectors.toList()));
    }

    public List<Connection> getConnectionsByPublicKey(String publicKey) {
        return connectionRepository.findAllByPublicKey(publicKey);
    }

    public List<ConnectionProperty> getPropertiesByConnectionId(Long connectionId) {
        return connectionPropertyService.getPropertiesByConnection(connectionId);
    }

    private ConnectionDTO ConnectionToDTO(Connection connection) {
        return modelMapper.map(connection, ConnectionDTO.class);
    }

    private ConnectionDTO ConnectionToDTOWithCompanyName(Connection connection) {
        ConnectionDTO connectionDTO = modelMapper.map(connection, ConnectionDTO.class);
        cloudCompanyRepository.findByPublicKey(connection.getPublicKey()).ifPresent(company -> connectionDTO.setCompanyName(company.getName()));
        return connectionDTO;
    }

    private Optional<User> getUser(Long userId) {
        return userRepository.findById(userId);
    }
}
