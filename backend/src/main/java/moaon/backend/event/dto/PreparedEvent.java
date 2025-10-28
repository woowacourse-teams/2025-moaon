package moaon.backend.event.dto;

import com.fasterxml.jackson.databind.JsonNode;
import moaon.backend.event.domain.EsEventOutbox;

public record PreparedEvent(
    EsEventOutbox event,
    JsonNode payload,
    String indexName
) {
}