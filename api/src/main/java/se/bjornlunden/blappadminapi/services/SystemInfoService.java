package se.bjornlunden.blappadminapi.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.bjornlunden.blappadminapi.dto.blapp.SystemInfoDTO;
import se.bjornlunden.blappadminapi.model.blapp.SystemInfo;
import se.bjornlunden.blappadminapi.repositories.blapp.SystemInfoRepository;
import se.bjornlunden.blappadminapi.repositories.blapp.specification.SystemInfoSpecification;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SystemInfoService {
    private final SystemInfoRepository systemInfoRepository;
    private final ModelMapper modelMapper;


    public SystemInfoService(SystemInfoRepository systemInfoRepository, ModelMapper modelMapper) {
        this.systemInfoRepository = systemInfoRepository;
        this.modelMapper = modelMapper;
    }

    public List<SystemInfoDTO> getAllSystemInfos(
            String searchQuery,
            String key,
            String operation
    ) {
        SystemInfoSpecification specification = new SystemInfoSpecification(searchQuery, key, operation);
        return systemInfoRepository.findAll(specification).stream().map(this::systemInfoToDTO).collect(Collectors.toList());
    }

    public SystemInfoDTO getSystemInfo(Long id) {
        return systemInfoToDTO(systemInfoRepository.getOne(id));
    }

    public SystemInfoDTO createSystemInfo(SystemInfo systemInfo) {
        return systemInfoToDTO(systemInfoRepository.save(systemInfo));
    }

    public Optional<SystemInfoDTO> updateSystemInfo(Long id, SystemInfoDTO systemInfoDTO) {
        return systemInfoRepository.findById(id).map(existingSystemInfo -> {
            existingSystemInfo.setMessage(systemInfoDTO.getMessage());
            existingSystemInfo.setExpireAt(systemInfoDTO.getExpireAt());
            existingSystemInfo.setActive(systemInfoDTO.getActive());
            existingSystemInfo.setLevel(systemInfoDTO.getLevel());
            return systemInfoToDTO(systemInfoRepository.save(existingSystemInfo));
        });


    }

    public void deleteSystemInfo(Long id) {
        systemInfoRepository.findById(id).ifPresent(systemInfoRepository::delete);
    }

    private SystemInfoDTO systemInfoToDTO(SystemInfo systemInfo) {
        return modelMapper.map(systemInfo, SystemInfoDTO.class);
    }

    private SystemInfo toDomain(SystemInfoDTO systemInfoDTO){
        return modelMapper.map(systemInfoDTO, SystemInfo.class);
    }

}
