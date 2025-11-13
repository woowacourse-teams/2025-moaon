package moaon.backend.article.api.crawl.service.client;

import java.io.IOException;
import java.net.URL;
import moaon.backend.article.api.crawl.dto.FinderCrawlResult;
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

    public static final String DIV_CONTENT_STYLE = "div.content_style, div.contents_style";

    public TistoryContentFinder(int connectionTimeoutSec, int readTimeoutSec) {
        super(connectionTimeoutSec, readTimeoutSec);
    }

    @Override
    public FinderCrawlResult crawl(URL link) {
        try {
            Response response = Jsoup.connect(link.toString())
                    .timeout((int) ((connectionTimeoutSeconds + readTimeoutSeconds)))
                    .ignoreHttpErrors(true)
                    .execute();
            validateLink(response.statusCode());

            Document doc = response.parse();
            String title = doc.title();
            String content = doc.body().text();

            Element element = doc.selectFirst(DIV_CONTENT_STYLE);
            if (element != null) {
                content = element.text();
            }

            return new FinderCrawlResult(title, content);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.ARTICLE_CRAWL_FAILED, e);
        }
    }

    @Override
    public boolean canHandle(URL url) {
        String host = url.getHost();
        return host.endsWith("tistory.com");
    }

    private void validateLink(int statusCode) {
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
