package se.bjornlunden.blappadminapi.security;

import com.microsoft.azure.spring.autoconfigure.aad.AADAppRoleStatelessAuthenticationFilter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Arrays;

/**
 * @author Patrik Holmkvist on 2020-09-16
 */
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final AADAppRoleStatelessAuthenticationFilter aadAuthFilter;

    public WebSecurityConfig(AADAppRoleStatelessAuthenticationFilter aadAuthFilter) {
        this.aadAuthFilter = aadAuthFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER);
        http.authorizeRequests()
                .antMatchers(
                        "/users/**",
                        "/connections/**",
                        "/company/**",
                        "statistic/**",
                        "integration/**",
                        "bla-api/**",
                        "solutions/**",
                        "subscriptions/**",
                        "system-info/**",
                        "dev-secret/**"
                )
                .hasAnyRole(getRoles())
                .antMatchers("/", "/index.html", "/public").permitAll()
                .anyRequest().authenticated();
        http.addFilterBefore(aadAuthFilter, UsernamePasswordAuthenticationFilter.class);
    }

    private String[] getRoles() {
        return new String[] {
                "Admin",
                "User",
                "Dev",
                "Support",
        };
    }
}
