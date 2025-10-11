package moaon.backend.article.domain;

import java.util.List;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;

public class ContentFinders {

    private static final List<ContentFinder> FINDERS = List.of(
            new TistoryContentFinder(),
            new NotionContentFinder(),
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
