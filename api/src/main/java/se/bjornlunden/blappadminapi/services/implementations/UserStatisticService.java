package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.stereotype.Service;
import se.bjornlunden.blappadminapi.model.blapp.User;
import se.bjornlunden.blappadminapi.repositories.blapp.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2021-04-01
 */
@Service
public class UserStatisticService {

    private final UserRepository userRepository;

    public UserStatisticService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Integer getUniqueLoginsAfter(LocalDateTime localDate) {
        return userRepository.countAllByLastLoginAfter(localDate.toLocalDate().atStartOfDay());
    }

    public Integer getCountOfCreatedUsersAfter(LocalDateTime localDate) {
        return userRepository.countAllByCreatedAtAfter(localDate.toLocalDate().atStartOfDay());
    }

    public Map<LocalDate, List<LocalDateTime>> getListOfCreatedOfSelectedMonth(LocalDateTime date) {
        return userRepository.findAllByCreatedAtAfterAndCreatedAtBefore(
                date.toLocalDate().atTime(LocalTime.MIN).with(TemporalAdjusters.firstDayOfMonth()),
                date.toLocalDate().atTime(LocalTime.MAX).with(TemporalAdjusters.lastDayOfMonth()))
                .stream().map(User::getCreatedAt).collect(Collectors.groupingBy(LocalDateTime::toLocalDate));
    }
}
