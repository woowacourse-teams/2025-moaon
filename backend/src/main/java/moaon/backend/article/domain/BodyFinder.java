package moaon.backend.article.domain;

import java.io.IOException;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.jsoup.Connection.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class BodyFinder extends ContentFinder {

    @Override
    public ArticleCrawlResponse crawl(String link) {
        try {
            Response response = Jsoup.connect(link)
                    .ignoreHttpErrors(true)
                    .execute();
            validateLink(response.statusCode());

            Document doc = response.parse();
            String title = doc.title();

            Element metaDesc = doc.selectFirst("meta[name=description]");
            String description = metaDesc != null ? metaDesc.attr("content") : "";
            int lastIndex = Math.min(description.length(), 255);
            String summary = description.substring(0, lastIndex);

            return new ArticleCrawlResponse(title, summary);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.ARTICLE_CRAWL_FAILED, e);
        }
    }

    @Override
    public boolean canHandle(String link) {
        return true;
    }

    protected void validateLink(int statusCode) {
        if (statusCode >= 400) {
            throw new CustomException(ErrorCode.ARTICLE_NOT_FOUND);
        }
    }
}
