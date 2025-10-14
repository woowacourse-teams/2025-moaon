package moaon.backend.article.domain;

import java.util.List;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
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

    public ContentFinder getFinder(String url) {
        return FINDERS.stream()
                .filter(contentFinder -> contentFinder.canHandle(url))
                .findFirst()
                .orElseThrow(() -> new CustomException(ErrorCode.CONTENT_FINDER_NOT_FOUND));
    }
}
