package se.bjornlunden.blappadminapi.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Patrik Holmkvist on 2020-09-21
 */
@Configuration
@EnableWebMvc
@Profile("prod")
public class WebConfigProd implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("HEAD",
                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS").allowedOrigins("https://blapp-support.bjornlunden.se");
    }
}
