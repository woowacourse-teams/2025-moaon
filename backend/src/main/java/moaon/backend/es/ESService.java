package moaon.backend.es;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.dto.ArticleQueryCondition;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.global.cursor.Cursor;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ESService {

    private final ArticleDocumentRepository repository;
    private final ArticleRepository articleRepository;

    public ArticleResponse search(ArticleQueryCondition condition) {
        final var searchHits = repository.search(condition);
        final var totalHits = searchHits.getTotalHits();
        final var articles = getOriginArticles(searchHits);
        System.out.println("------------------------------");
        searchHits.getSearchHits().forEach(hit -> {
            System.out.printf("[%s][%s] : %.3f점\n", hit.getId(), hit.getContent().getTitle(), hit.getScore());
        });

        final var maybeHasNext = articles.size() == condition.limit();
        if (maybeHasNext) {
            final var cursor = nextCursorFor(searchHits);
            return ArticleResponse.from(articles, totalHits, true, cursor.getNextCursor());
        }
        return ArticleResponse.from(articles, totalHits, false, null);
    }

    private List<Article> getOriginArticles(final SearchHits<ArticleDocument> searchHits) {
        final var ids = searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .map(ArticleDocument::getId)
                .map(Long::parseLong)
                .toList();

        return articleRepository.findAllById(ids)
                .stream()
                .sorted(Comparator.comparingInt(a -> ids.indexOf(a.getId())))
                .toList();
    }

    private Cursor<?> nextCursorFor(final SearchHits<ArticleDocument> searchHits) {
        final var sortValues = searchHits.getSearchHits().getLast().getSortValues();
        return new ESCursor(sortValues);
    }
}
