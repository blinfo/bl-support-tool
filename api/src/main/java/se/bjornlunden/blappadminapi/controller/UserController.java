package se.bjornlunden.blappadminapi.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.bjornlunden.blappadminapi.dto.blapp.UserDTO;
import se.bjornlunden.blappadminapi.services.implementations.UserService;

import javax.annotation.security.RolesAllowed;
import java.util.Optional;

/**
 * @author Patrik Holmkvist on 2020-06-10
 */
@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Page<UserDTO> getUserBatch(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "25") Integer size,
            @RequestParam(value = "search", required = false) String searchQuery,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir,
            @RequestParam(value = "sortKey", defaultValue = "id") String sortKey
    ) {
        return userService.getUsers(page, size, searchQuery, sortDir, sortKey);
    }

    @GetMapping("{id}")
    public UserDTO getUser(@PathVariable Long id) {
        return userService.getUser(id)
                .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Kunde inte hitta användare med id " + id));
    }

    @PutMapping("{id}")
    @RolesAllowed({"Admin", "Dev"})
    public Optional<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO){
        return userService.updateUser(id,userDTO);
    }
}
