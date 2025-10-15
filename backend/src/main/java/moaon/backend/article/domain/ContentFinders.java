package moaon.backend.article.domain;

import java.net.URL;
import java.util.List;
import moaon.backend.global.util.EnvLoader;

public class ContentFinders {

    private static final List<ContentFinder> FINDERS = List.of(
            new TistoryContentFinder(),
            new NotionContentFinder(
                    EnvLoader.getEnv("NOTION_USER_ID"),
                    EnvLoader.getEnv("NOTION_TOKEN_V2")
            ),
            new VelogContentFinder(),
            new BodyFinder()
    );

    public ContentFinder getFinder(URL url) {
        return FINDERS.stream()
                .filter(contentFinder -> contentFinder.canHandle(url))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("[ERROR] 지원하지 않는 URL 입니다."));
    }
}
