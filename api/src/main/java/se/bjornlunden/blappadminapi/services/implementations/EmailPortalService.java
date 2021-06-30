package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import se.bjornlunden.blappadminapi.dto.emailportal.EmailPortalSettingsDTO;


@Service
public class EmailPortalService {
    private final String EMAIL_PORTAL_URL;
    private final RestTemplate restTemplate;

    public EmailPortalService(@Value("${email-portal.url}") String emailPortalUrl, RestTemplateBuilder restTemplateBuilder) {
        this.EMAIL_PORTAL_URL = emailPortalUrl;
        this.restTemplate = restTemplateBuilder.build();
    }

    public EmailPortalSettingsDTO getSettings(String publicKey) {
        ResponseEntity<EmailPortalSettingsDTO> response = this.restTemplate.getForEntity(EMAIL_PORTAL_URL + "settings/" + publicKey, EmailPortalSettingsDTO.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        }
        return null;
    }

    public EmailPortalSettingsDTO[] getSettingsByEmail(String email) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(EMAIL_PORTAL_URL + "settings")
                .queryParam("emailPortalAddress", email);
        ResponseEntity<EmailPortalSettingsDTO[]> response = this.restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                null,
                EmailPortalSettingsDTO[].class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        }
        return null;
    }

}
