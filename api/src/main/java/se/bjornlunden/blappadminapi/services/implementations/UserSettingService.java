package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.repositories.blapp.UserSettingRepository;

/**
 * @author Patrik Holmkvist on 2021-01-29
 */
@Service
public class UserSettingService {
    private final UserSettingRepository userSettingRepository;
    private static final String BL_ALL_INCLUSIVE = "BL_ALL_INCLUSIVE";

    public UserSettingService(UserSettingRepository userSettingRepository) {
        this.userSettingRepository = userSettingRepository;
    }

    public Boolean isBlAllInclusive(Long userId) {
        return userSettingRepository.findFirstByUserIdAndValue(userId, BL_ALL_INCLUSIVE).isPresent();
    }
}
