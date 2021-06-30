package se.bjornlunden.blappadminapi.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Patrik Holmkvist on 2021-04-30
 */
@Service
public class AuthorizationService {
    private final ObjectMapper mapper = new ObjectMapper();
    private final BlaApiProperties properties;
    private final HttpClient client;
    private Token token;

    public AuthorizationService(@Value("${blaapi.key}") String blaClientId,
                                @Value("${blaapi.secret}") String blaClientSecret,
                                @Value("${blaapi.token-url}") String tokenUrl) {
        this.client = HttpClient.newHttpClient();
        this.properties = BlaApiProperties.builder()
                .clientId(blaClientId)
                .clientSecret(blaClientSecret)
                .tokenUrl(tokenUrl)
                .build();
    }

    public String getAuthorizationStr() {
        if (token == null || token.hasExpired()) {
            Map<String, String> values = Map.of("grant_type", "client_credentials",
                    "scope", "",
                    "client_id", properties.getClientId(),
                    "client_secret", properties.getClientSecret()
            );

            String bodyStr = values.entrySet().stream()
                    .map(e -> e.getKey() + "=" + e.getValue())
                    .collect(Collectors.joining("&"));
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(properties.getTokenUrl()))
                    .headers("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(bodyStr))
                    .build();
            HttpResponse<String> httpResponse = send(request, HttpResponse.BodyHandlers.ofString());
            try {
                token = mapper.readValue(httpResponse.body(), Token.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return token.toString();
    }

    private <T> HttpResponse<T> send(HttpRequest request, java.net.http.HttpResponse.BodyHandler<T> bodyHandler) {
        try {
            return client.send(request,bodyHandler);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Error sending http",e);
        }
    }
}
