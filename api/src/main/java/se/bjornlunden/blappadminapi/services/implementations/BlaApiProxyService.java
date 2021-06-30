package se.bjornlunden.blappadminapi.services.implementations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import se.bjornlunden.blappadminapi.security.AuthorizationService;

/**
 * @author Patrik Holmkvist on 2021-04-28
 */
@Service
public class BlaApiProxyService {
    private final WebClient.Builder clientBuilder;
    private final AuthorizationService authorizationService;
    private final String baseUrl;

    public BlaApiProxyService(@Value("${blaapi.url}") String baseUrl,
                              @Value("${blaapi.api-version}") String apiVersion,
                              WebClient.Builder clientBuilder,
                              AuthorizationService authorizationService) {
        this.clientBuilder = clientBuilder;
        this.authorizationService = authorizationService;
        this.baseUrl = baseUrl + apiVersion;
    }

    public Mono<byte[]> call(String path, String publicKey, String accept, MultiValueMap<String, String> params, HttpMethod httpMethod) {
        WebClient webClient = clientBuilder.baseUrl(baseUrl).build();
        return webClient.method(httpMethod).uri(uriBuilder ->
                uriBuilder.path(path.replace("/bla-api", "/sp"))
                        .queryParams(params)
                        .build()
        ).headers(httpHeaders -> setHeaders(httpHeaders, accept, null, publicKey)).retrieve()
                .bodyToMono(ByteArrayResource.class).map(ByteArrayResource::getByteArray);
    }

    // TODO Inte testad
    public Mono<byte[]> call(String path, String publicKey, String accept, String contentType, MultiValueMap<String, String> params, HttpMethod httpMethod, Byte[] body) {
        WebClient webClient = clientBuilder.baseUrl(baseUrl).build();
        return webClient.method(httpMethod).uri(uriBuilder ->
                uriBuilder.path(path.replace("/bla-api", "/sp"))
                        .queryParams(params)
                        .build()
        ).bodyValue(body).headers(httpHeaders -> setHeaders(httpHeaders, accept, contentType, publicKey)).retrieve()
                .bodyToMono(ByteArrayResource.class).map(ByteArrayResource::getByteArray);
    }

    private void setHeaders(MultiValueMap<String, String> httpHeaders, String accept, String contentType, String publicKey) {
        httpHeaders.add("Accept", accept);
        if (contentType != null) {
            httpHeaders.add("Content-Type", contentType);
        }
        httpHeaders.add("Authorization", authorizationService.getAuthorizationStr());
        httpHeaders.add("User-Key", publicKey);
    }
}
