package moaon.backend.article.domain;

import java.io.IOException;
import java.util.List;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.openqa.selenium.By;

public class BodyFinder extends ContentFinder {

    @Override
    public ArticleCrawlResponse crawl(String url) {
        validateLink(url);
        try {
            Document doc = Jsoup.connect(url).get();
            Element metaDesc = doc.selectFirst("meta[name=description]");
            String summary = metaDesc != null ? metaDesc.attr("content") : "";
            String title = doc.title();

            return new ArticleCrawlResponse(title, summary);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.UNKNOWN);
        }
    }

    @Override
    public boolean canHandle(String link) {
        return true;
    }

    protected List<By> getBy(String link) {
        return List.of(By.tagName("body"));
    }

    protected void validateLink(String link) {

    }
}
