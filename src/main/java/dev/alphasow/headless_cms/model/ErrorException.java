package dev.alphasow.headless_cms.model;

public record ErrorException(
        String message,
        int status
) {
}
