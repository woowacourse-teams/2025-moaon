package moaon.backend.event.domain;

import lombok.Getter;

@Getter
public enum EventStatus {
    PENDING("PENDING"),
    PROCESSING("PROCESSING"),
    PROCESSED("PROCESSED"),
    FAILED("FAILED");

    private final String status;

    EventStatus(String status) {
        this.status = status;
    }
}
