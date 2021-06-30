package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.model.blapp.ConnectionProperty;
import se.bjornlunden.blappadminapi.repositories.blapp.ConnectionPropertyRepository;
import se.bjornlunden.blappadminapi.repositories.blapp.ConnectionRepository;
import se.bjornlunden.blappadminapi.repositories.blapp.PropertyRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2020-09-04
 */
@Service
public class ConnectionPropertyService {
    private final ConnectionPropertyRepository connectionPropertyRepository;
    private final PropertyRepository propertyRepository;
    private final ConnectionRepository connectionRepository;

    public ConnectionPropertyService(ConnectionPropertyRepository connectionPropertyRepository, PropertyRepository propertyRepository, ConnectionRepository connectionRepository) {
        this.connectionPropertyRepository = connectionPropertyRepository;
        this.propertyRepository = propertyRepository;
        this.connectionRepository = connectionRepository;
    }

    public List<ConnectionProperty> getAllConnectionProperties() {
        return connectionPropertyRepository.findAll();
    }

    public List<ConnectionProperty> getPropertiesByConnection(Long connectionId) {
        return connectionPropertyRepository.findByConnection_Id(connectionId);
    }

    public Optional<ConnectionProperty> save(ConnectionProperty connectionProperty) {
        return propertyRepository.findByKey(connectionProperty.getProperty().getKey()).flatMap(property -> {
            connectionProperty.setProperty(property);
            return connectionRepository.findById(connectionProperty.getConnection().getId());
        }).map(connection -> {
            connectionProperty.setConnection(connection);
            return connectionPropertyRepository.save(connectionProperty);
        });
    }

    public Optional<ConnectionProperty> update(ConnectionProperty connectionProperty, Long id) {
        return connectionPropertyRepository.findById(id).map(existingConnectionProperty -> {
            existingConnectionProperty.setValue(connectionProperty.getValue());
            return connectionPropertyRepository.save(existingConnectionProperty);
        });
    }

    public void delete(long id) {
        connectionPropertyRepository.findById(id).ifPresent(connectionPropertyRepository::delete);
    }
}
