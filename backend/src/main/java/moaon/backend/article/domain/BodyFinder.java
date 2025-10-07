package moaon.backend.article.domain;

import java.util.List;
import org.openqa.selenium.By;

public class BodyFinder extends ContentFinder {

    @Override
    public boolean canHandle(String link) {
        return true;
    }

    @Override
    protected List<By> getBy(String link) {
        return List.of(By.tagName("body"));
    }

    @Override
    protected void validateLink(String link) {
        
    }
}
