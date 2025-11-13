package moaon.backend.article.api.crawl.service.client;

import java.net.URL;
import java.util.List;
import moaon.backend.global.util.EnvLoader;

public class ContentFinders {

    private static final List<ContentFinder> FINDERS = List.of(
            new TistoryContentFinder(3, 5),
            new NotionContentFinder(
                    3, 5,
                    EnvLoader.getEnv("NOTION_USER_ID"),
                    EnvLoader.getEnv("NOTION_TOKEN_V2")
            ),
            new VelogContentFinder(3, 5),
            new BodyFinder(5, 30)
    );

    public ContentFinder getFinder(URL url) {
        return FINDERS.stream()
                .filter(contentFinder -> contentFinder.canHandle(url))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("[ERROR] 지원하지 않는 URL 입니다."));
    }
}
