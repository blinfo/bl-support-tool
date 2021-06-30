package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import se.bjornlunden.blappadminapi.model.blapp.UserSetting;

import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2021-01-29
 */
public interface UserSettingRepository extends JpaRepository<UserSetting, Long> {

    Optional<UserSetting> findFirstByUserIdAndValue(Long userId, String value);
}
