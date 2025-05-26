package dev.alphasow.headless_cms.authentication;

public record AuthenticationCredential(
        String accessToken,
        String tokenType 
) {
}
