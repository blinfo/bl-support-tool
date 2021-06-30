package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.model.blapp.Property;
import se.bjornlunden.blappadminapi.repositories.blapp.PropertyRepository;
import se.bjornlunden.blappadminapi.services.CrudService;

import java.util.List;
import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2021-06-07
 */
@Service
public class PropertyService implements CrudService<Property, Long> {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @Override
    public List<Property> findAll() {
        return propertyRepository.findAll();
    }

    @Override
    public Optional<Property> findById(Long id) {
        return propertyRepository.findById(id);
    }

    @Override
    public Property save(Property object) {
        return propertyRepository.save(object);
    }

    @Override
    public Optional<Property> update(Property object, Long id) {
        return findById(id).map(property -> {
            property.setValue(object.getValue());
            return propertyRepository.save(property);
        });
    }

    @Override
    public void delete(Property object) {

    }

    @Override
    public void deleteById(Long aLong) {

    }
}
