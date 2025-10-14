package moaon.backend.article.domain;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import moaon.backend.article.dto.ArticleCrawlResponse;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.jsoup.Connection.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class TistoryContentFinder extends ContentFinder {
    /*
    티스토리가 사용중인 도메인 주소: tistory.com
    이 외 사용자 지정 도메인 주소는 BodyFinder 가 수행한다.
     */

    @Override
    public ArticleCrawlResponse crawl(String url) {

        try {
            Response response = Jsoup.connect(url)
                    .ignoreHttpErrors(true)
                    .execute();
            validateLink(response.statusCode());

            Document doc = response.parse();
            Element metaDesc = doc.selectFirst("meta[name=description]");
            String summary = metaDesc != null ? metaDesc.attr("content") : "";
            String title = doc.title();

            return new ArticleCrawlResponse(title, summary);
        } catch (IOException e) {
            System.out.println("e = " + e);
            throw new CustomException(ErrorCode.UNKNOWN, e);
        }
    }

    @Override
    public boolean canHandle(String link) {
        try {
            URL url = new URL(link);
            String host = url.getHost();

            return host.endsWith("tistory.com");
        } catch (MalformedURLException e) {
            return false;
        }
    }

    protected void validateLink(int statusCode) {
        if (statusCode == 403) {
            throw new CustomException(ErrorCode.ARTICLE_URL_FORBIDDEN);
        }
        if (statusCode == 404) {
            throw new CustomException(ErrorCode.ARTICLE_URL_NOT_FOUND);
        }
        if (statusCode == 410) {
            throw new CustomException(ErrorCode.ARTICLE_URL_GONE);
        }
    }
}
