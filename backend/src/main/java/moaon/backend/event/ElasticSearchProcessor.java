package moaon.backend.event;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.BulkRequest;
import co.elastic.clients.elasticsearch.core.BulkRequest.Builder;
import co.elastic.clients.elasticsearch.core.BulkResponse;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moaon.backend.event.domain.EsEventOutbox;
import moaon.backend.event.domain.EventAction;
import moaon.backend.event.dto.PreparedEvent;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ElasticSearchProcessor {

    private final ElasticsearchClient esClient;

    public BulkResponse processEvents(List<PreparedEvent> preparedEvents) throws IOException {
        BulkRequest.Builder br = new BulkRequest.Builder();
        for (PreparedEvent preparedEvent : preparedEvents) {
            EsEventOutbox event = preparedEvent.event();
            if (event.getAction() == EventAction.DELETED) {
                appendDeleteOperation(event, br, preparedEvent.indexName());
            }
            if (event.getAction() == EventAction.INSERT || event.getAction() == EventAction.UPDATED) {
                appendUpsertOperation(event, br, preparedEvent.indexName(), preparedEvent.payload());
            }
        }

        if (preparedEvents.isEmpty()) {
            return BulkResponse.of(b -> b.items(List.of()).errors(false).took(0));
        }

        return esClient.bulk(br.build());
    }

    private void appendUpsertOperation(
            EsEventOutbox event,
            Builder br,
            String indexName,
            JsonNode payloadNode
    ) {
        br.operations(op -> op
                .update(u -> u
                        .index(indexName)
                        .id(String.valueOf(event.getEntityId()))
                        .action(a -> a
                                .doc(payloadNode)
                                .docAsUpsert(true)
                        )
                )
        );
    }

    private void appendDeleteOperation(
            EsEventOutbox event,
            Builder br,
            String indexName
    ) {
        br.operations(op -> op
                .delete(d -> d
                        .index(indexName)
                        .id(String.valueOf(event.getEntityId()))
                )
        );
    }
}
