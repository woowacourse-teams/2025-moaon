package moaon.backend.article.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CreatedAtCursor implements Cursor<LocalDateTime> {

    private final LocalDateTime createdAt;
    private final Long id;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Override
    public LocalDateTime getSortValue() {
        return createdAt;
    }

    @Override
    public Long getLastId() {
        return id;
    }

    @Override
    public String getNextCursor() {
        return createdAt.format(FORMATTER) + "_" + id.toString();
    }
}
