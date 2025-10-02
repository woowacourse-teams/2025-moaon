package moaon.backend.article.domain;

import java.util.List;
import org.openqa.selenium.By;

public class NotionContentFinder extends ContentFinder {

    @Override
    public boolean canHandle(String link) {
        String[] split = link.split("\\.");
        String secondLevelDomain = split[1];
        String topLevelDomain = split[2];

        return "notion".equals(secondLevelDomain) && "site".equals(topLevelDomain);
    }

    @Override
    protected List<By> getBy(String link) {
        return List.of(By.className("notion-page-content"));
    }
}
