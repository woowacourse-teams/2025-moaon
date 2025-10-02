package moaon.backend.article.domain;

import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

import java.time.Duration;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public abstract class ContentFinder {

    private final WebDriver driver = new ChromeDriver();

    public String getText(String link) {
        try {
            driver.get(link);
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
            System.out.println("---------------------------");

            List<By> bys = getBy(link);

            // todo
            // 조건에 맞는 by 찾고, 읽고, 탈출
            
            for (By by : bys) {
                WebElement webElement = wait.until(presenceOfElementLocated(by)).findElement(by);
            }

            return null;

        } finally {
            driver.quit();
        }
    }

    public abstract boolean canHandle(String link);

    protected abstract List<By> getBy(String link);
}
