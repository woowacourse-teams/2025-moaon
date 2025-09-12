package moaon.backend.global.cursor;

import static moaon.backend.project.domain.QProject.project;

import com.querydsl.core.BooleanBuilder;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ArticleCountProjectCursor implements Cursor<Integer> {

    private final int count;
    private final Long id;

    @Override
    public Integer getSortValue() {
        return count;
    }

    @Override
    public Long getLastId() {
        return id;
    }

    @Override
    public String getNextCursor() {
        return count + "_" + id;
    }

    @Override
    public void applyCursor(BooleanBuilder whereBuilder) {
        whereBuilder.and(
                project.articles.size().lt(getSortValue())
                        .or(
                                project.articles.size().eq(getSortValue())
                                        .and(project.id.lt(getLastId()))
                        )
        );
    }

}
