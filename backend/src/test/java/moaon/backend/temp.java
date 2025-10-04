package moaon.backend;

import java.time.Duration;
import java.util.List;
import moaon.backend.article.domain.BodyFinder;
import moaon.backend.article.domain.TistoryContentFinder;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class temp {

    WebDriver driver = new ChromeDriver();

    @Test
    void notion() throws InterruptedException {

        try {
            driver.get("https://bini-team.notion.site/apiClient-class-vs-239cb79c55d0802b984ccff311d79b3e");

            // 👇 최대 10초까지 기다리되, 요소가 나타나는 즉시 진행
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));

            // notion-page-content 가 로드될 때까지 기다림
            wait.until(ExpectedConditions.presenceOfElementLocated(By.className("notion-page-content")));

            // 요소 로드 후 바로 탐색
            List<WebElement> blocks = driver.findElements(By.className("notion-page-content"));

            for (WebElement block : blocks) {
                String text = block.getText().trim();
                if (!text.isEmpty()) {
                    System.out.println(text);
                }
            }
        } finally {
            driver.quit();
        }
    }

    @Test
    void temp2() {
        String text = new TistoryContentFinder().getText("https://nnoco.tistory.com/239");
        System.out.println("text = " + text);
    }

    @Test
    void temp3() {
        String text = new BodyFinder().getText("https://nnoco.tistory.com/239");
        System.out.println("text = " + text);
    }
}
