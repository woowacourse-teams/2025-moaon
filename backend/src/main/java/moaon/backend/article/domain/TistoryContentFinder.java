package moaon.backend.article.domain;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import org.openqa.selenium.By;

public class TistoryContentFinder extends ContentFinder {

    @Override
    public boolean canHandle(String link) {
        try {
            URL url = new URL(link);
            String host = url.getHost();
            System.out.println(host);
            return host.endsWith("tistory.com");
        } catch (MalformedURLException e) {
            return false;
        }
    }

    @Override
    protected List<By> getBy(String link) {
        return List.of(By.cssSelector("div.contents_style"), By.cssSelector("div.content_style"));
    }
}
