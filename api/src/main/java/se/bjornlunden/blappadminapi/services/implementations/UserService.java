package se.bjornlunden.blappadminapi.services.implementations;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.dto.blapp.UserDTO;
import se.bjornlunden.blappadminapi.model.blapp.User;
import se.bjornlunden.blappadminapi.repositories.blapp.UserRepository;
import se.bjornlunden.blappadminapi.repositories.blapp.specification.UserSpecification;

import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2020-06-10
 */
@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserSettingService userSettingService;
    private final ModelMapper modelMapper;

    public UserService(UserRepository userRepository, UserSettingService userSettingService, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.userSettingService = userSettingService;
        this.modelMapper = modelMapper;
    }

    public Page<UserDTO> getUsers(
            Integer page,
            Integer size,
            String searchQuery,
            String sortDir,
            String sortKey) {

        Sort sort = Sort.by(!sortDir.equals("desc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortKey);
        Pageable pageable = PageRequest.of(page, size, sort);
        UserSpecification userSpecification = new UserSpecification(searchQuery);
        return userRepository.findAll(userSpecification, pageable).map(this::UserToDTO);
    }

    public Optional<UserDTO> getUser(Long userId) {
        return userRepository.findById(userId).map(this::UserToDTO);
    }

    public Optional<UserDTO> updateUser(Long id, UserDTO userDTO) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setName(userDTO.getName());
            existingUser.setPin(userDTO.getPin());
            return UserToDTO(userRepository.save(existingUser));
        });
    }

    private UserDTO UserToDTO(User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setBlAllInclusive(userSettingService.isBlAllInclusive(user.getId()));
        return userDTO;
    }
}
