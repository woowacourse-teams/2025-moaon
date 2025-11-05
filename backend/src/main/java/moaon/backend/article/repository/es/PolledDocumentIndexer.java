package moaon.backend.article.repository.es;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.BulkRequest;
import co.elastic.clients.elasticsearch.core.BulkRequest.Builder;
import co.elastic.clients.elasticsearch.core.BulkResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.event.domain.EsEventOutbox;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PolledDocumentIndexer {

    private final ElasticsearchClient esClient;
    private final ObjectMapper objectMapper;

    public BulkResponse processEvents(List<EsEventOutbox> preparedEvents) throws IOException {
        if (preparedEvents.isEmpty()) {
            return BulkResponse.of(b -> b.items(List.of()).errors(false).took(0));
        }

        BulkRequest.Builder br = new BulkRequest.Builder();
        for (EsEventOutbox event : preparedEvents) {
            if (event.isUpsert()) {
                appendUpsertOperation(event, br);
            } else {
                appendDeleteOperation(event, br);
            }
        }

        return esClient.bulk(br.build());
    }

    private void appendUpsertOperation(EsEventOutbox event, Builder br) {
        br.operations(op -> op
                .update(u -> u
                        .index(event.getEventType())
                        .id(String.valueOf(event.getEntityId()))
                        .action(a -> a
                                .doc(event.getPayload(objectMapper))
                                .docAsUpsert(true)
                        )
                )
        );
    }

    private void appendDeleteOperation(EsEventOutbox event, Builder br) {
        br.operations(op -> op
                .delete(d -> d
                        .index(event.getEventType())
                        .id(String.valueOf(event.getEntityId()))
                )
        );
    }
}
