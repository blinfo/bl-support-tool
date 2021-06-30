package se.bjornlunden.blappadminapi.services;

import java.util.List;
import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2021-06-07
 */
public interface CrudService<T, ID>{

    List<T> findAll();

    Optional<T> findById(ID id);

    T save(T object);

    Optional<T> update(T object, ID id);

    void delete(T object);

    void deleteById(ID id);
}
