package moaon.backend.article.dto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ClickCursor implements Cursor<Integer> {

    private final int clicks;
    private final Long id;

    @Override
    public Integer getSortValue() {
        return clicks;
    }

    @Override
    public Long getLastId() {
        return id;
    }

    @Override
    public String getNextCursor() {
        return clicks + "_" + id;
    }
}
