package moaon.backend.article.domain;

import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

import java.time.Duration;
import java.util.List;
import java.util.NoSuchElementException;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public abstract class ContentFinder {

    public String getText(String link) {
        WebDriver driver = new ChromeDriver();

        try {
            validateLink(link);
            driver.get(link);
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            List<By> bys = getBy(link);
            for (By by : bys) {
                try {
                    WebElement webElement = wait.until(presenceOfElementLocated(by));
                    System.out.println(webElement.getText().trim() + "----------------");
                    return webElement.getText().trim();
                } catch (TimeoutException | NoSuchElementException e) {
                    continue;
                }
            }

            throw new IllegalArgumentException("[ERROR] can't handle link");
        } finally {
            driver.quit();
        }
    }

    public abstract boolean canHandle(String link);

    protected abstract List<By> getBy(String link);

    protected abstract void validateLink(String link);
}
