package moaon.backend.article.service;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.ArticleDocument;
import moaon.backend.article.dto.ArticleESQuery;
import moaon.backend.article.dto.ArticleResponse;
import moaon.backend.article.repository.ArticleRepository;
import moaon.backend.article.repository.es.ArticleDocumentRepository;
import moaon.backend.global.cursor.ESCursor;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ESArticleService {

    private final ArticleDocumentRepository repository;
    private final ArticleRepository articleRepository;

    public ArticleResponse search(ArticleESQuery condition) {
        SearchHits<ArticleDocument> searchHits = repository.search(condition);
        long totalHits = searchHits.getTotalHits();
        List<Article> articles = getOriginArticles(searchHits);

        boolean maybeHasNext = articles.size() == condition.limit();
        if (maybeHasNext) {
            ESCursor cursor = nextCursorFor(searchHits);
            return ArticleResponse.from(articles, totalHits, true, cursor.getNextCursor());
        }
        return ArticleResponse.withoutNextCursor(articles, totalHits, false);
    }

    private List<Article> getOriginArticles(SearchHits<ArticleDocument> searchHits) {
        List<Long> ids = searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .map(ArticleDocument::getId)
                .toList();

        return articleRepository.findAllById(ids)
                .stream()
                .sorted(Comparator.comparingInt(a -> ids.indexOf(a.getId())))
                .toList();
    }

    private ESCursor nextCursorFor(SearchHits<ArticleDocument> searchHits) {
        List<Object> sortValues = searchHits.getSearchHits().getLast().getSortValues();
        return new ESCursor(sortValues);
    }
}
