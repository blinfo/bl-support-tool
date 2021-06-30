package se.bjornlunden.blappadminapi.controller;



import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import se.bjornlunden.blappadminapi.dto.blapp.SystemInfoDTO;
import se.bjornlunden.blappadminapi.model.blapp.SystemInfo;
import se.bjornlunden.blappadminapi.services.SystemInfoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("system-info")
public class SystemInfoController {
    private final SystemInfoService systemInfoService;

    public SystemInfoController(SystemInfoService systemInfoService) {
        this.systemInfoService = systemInfoService;
    }

    @GetMapping
    public List<SystemInfoDTO> getAllSystemInfos(
            @RequestParam(value = "search", required = false) String searchQuery,
            @RequestParam(value = "key", required = false) String key,
            @RequestParam(value = "operation", required = false) String operation
    ) {
        return systemInfoService.getAllSystemInfos(searchQuery, key, operation);
    }

    @GetMapping("/{id}")
    public SystemInfoDTO getSystemInfo(@PathVariable Long id) {
        return systemInfoService.getSystemInfo(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('Admin','Dev')")
    public SystemInfoDTO createSystemInfo(@RequestBody SystemInfo systemInfo) {
        return systemInfoService.createSystemInfo(systemInfo);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('Admin','Dev')")
    public Optional<SystemInfoDTO> updateSystemInfo(@PathVariable Long id, @RequestBody SystemInfoDTO systemInfoDTO) {
        return systemInfoService.updateSystemInfo(id, systemInfoDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('Admin','Dev')")
    public void deleteSystemInfo(@PathVariable Long id) {
        systemInfoService.deleteSystemInfo(id);
    }
}
