package se.bjornlunden.blappadminapi.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;

/**
 * @author Patrik Holmkvist on 2021-04-30
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Token {

    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("token_type")
    private String tokenType;
    @JsonProperty("expires_in")
    private long expires_in;
    @JsonIgnore
    private long timestamp;

    public Token() {
        this.timestamp = Instant.now().getEpochSecond();
    }

    public boolean isValid() {
        return Instant.now().getEpochSecond() - this.timestamp < expires_in;
    }

    public boolean hasExpired() {
        return !isValid();
    }

    @Override
    public String toString() {
        return this.tokenType + " " + this.accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public long getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(long expires_in) {
        this.expires_in = expires_in;
    }
}
