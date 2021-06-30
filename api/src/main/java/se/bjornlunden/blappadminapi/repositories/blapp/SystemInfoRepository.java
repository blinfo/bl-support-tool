package se.bjornlunden.blappadminapi.repositories.blapp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import se.bjornlunden.blappadminapi.model.blapp.SystemInfo;

public interface SystemInfoRepository extends JpaRepository<SystemInfo, Long> , JpaSpecificationExecutor<SystemInfo> {

}
