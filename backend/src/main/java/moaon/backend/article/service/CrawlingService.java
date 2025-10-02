package moaon.backend.article.service;

import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class CrawlingService {

    private final WebDriver driver = new ChromeDriver();

    // className 일 수도 있고 아닐 수도 있고
    // link.getClassName

    /*
    어디 팩토리한테 raw link
    팩토리가 추상화된 Link (NotionLink, ...)

    getBy() <- 인터페이스 추상 메서드가 들고 있고
    link 들이 이 인터페이스 impl 하고

    link.getBy()
     */

    public String crawl(String link) {
        try {
            driver.get(link);
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));

            wait.until(ExpectedConditions.presenceOfElementLocated(By.className("notion-page-content")));

            // link.get()
            // link 도 추상화
            WebElement element = driver.findElement(By.className("notion-page-content"));

            return element.getText().trim();

        } finally {
            driver.quit();
        }
    }
}
