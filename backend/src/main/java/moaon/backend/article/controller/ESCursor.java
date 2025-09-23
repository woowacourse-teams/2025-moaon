package moaon.backend.article.controller;

import com.querydsl.core.types.dsl.BooleanExpression;
import java.util.List;
import java.util.Objects;
import moaon.backend.global.cursor.Cursor;

public class ESCursor implements Cursor<String> {

    private final List<Object> sortValues;

    public ESCursor(final List<Object> sortValues) {
        final var sortValue = sortValues.get(0);
        final var lastId = sortValues.get(1);
        this.sortValues = List.of(sortValue, lastId);
    }

    public ESCursor(final String rawCursor) {
        final var cursor = Objects.requireNonNullElse(rawCursor, "");
        this.sortValues = List.of(cursor.split("_"));
    }

    @Override
    public String getSortValue() {
        return sortValues.getFirst().toString();
    }

    @Override
    public Long getLastId() {
        return Long.parseLong(sortValues.getLast().toString());
    }

    @Override
    public String getNextCursor() {
        return sortValues.getFirst() + "_" + sortValues.getLast();
    }

    @Override
    public BooleanExpression getCursorExpression() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
