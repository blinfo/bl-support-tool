package se.bjornlunden.blappadminapi.controller;

import org.springframework.http.HttpMethod;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import se.bjornlunden.blappadminapi.services.implementations.BlaApiProxyService;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Patrik Holmkvist on 2021-04-28
 */
@RestController
@RequestMapping("bla-api")
public class BlaApiProxyController {
    private final BlaApiProxyService blaApiProxyService;

    public BlaApiProxyController(BlaApiProxyService blaApiProxyService) {
        this.blaApiProxyService = blaApiProxyService;
    }

    @GetMapping("/**")
    public Mono<byte[]> get(
            @RequestHeader("publicKey") String publicKey,
            @RequestHeader("Accept") String accept,
            @RequestParam MultiValueMap<String, String> requestParams,
            HttpServletRequest request) {
        return blaApiProxyService.call(request.getRequestURI(), publicKey, accept, requestParams, HttpMethod.GET);
    }


}
