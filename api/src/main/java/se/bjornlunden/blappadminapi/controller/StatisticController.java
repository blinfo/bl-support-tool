package se.bjornlunden.blappadminapi.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import se.bjornlunden.blappadminapi.services.implementations.UserStatisticService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * @author Patrik Holmkvist on 2021-04-01
 */
@RestController
@RequestMapping("statistic")
public class StatisticController {

    private final UserStatisticService userStatisticService;

    public StatisticController(UserStatisticService userStatisticService) {
        this.userStatisticService = userStatisticService;
    }

    @GetMapping("count/logins")
    public Integer getUniqueLoginsAfter(
            @RequestParam("days") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime localDate) {
        return userStatisticService.getUniqueLoginsAfter(localDate);
    }

    @GetMapping("count/created")
    public Integer getCountOfCreatedUsersAfter(
            @RequestParam(value = "days") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime localDate) {
        return userStatisticService.getCountOfCreatedUsersAfter(localDate);
    }

    @GetMapping("created/month")
    public Map<LocalDate, List<LocalDateTime>> getCreatedUsersOfSelectedMonth(
            @RequestParam(value = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) {
        return userStatisticService.getListOfCreatedOfSelectedMonth(date);
    }
}
