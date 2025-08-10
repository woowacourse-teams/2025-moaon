package moaon.backend.article.repository;

import moaon.backend.article.dto.ArticleQueryCondition;

public interface QueryModifier<T> {

    T modify(ArticleQueryCondition condition);
}
