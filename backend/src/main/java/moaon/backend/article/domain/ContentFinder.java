package moaon.backend.article.domain;

import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Duration;
import java.util.List;
import java.util.NoSuchElementException;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public abstract class ContentFinder {

    private final WebDriver driver = new ChromeDriver();

    public String getText(String link) {
        try {
            validateLink(link);
            driver.get(link);
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));

            List<By> bys = getBy(link);
            for (By by : bys) {
                try {
                    WebElement webElement = wait.until(presenceOfElementLocated(by));
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

    private void validateLink(String link) {
        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(link).openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            int code = connection.getResponseCode();
            if (code == 403) {
                throw new CustomException(ErrorCode.ARTICLE_URL_FORBIDDEN);
            }
            if (code == 404) {
                throw new CustomException(ErrorCode.PROJECT_NOT_FOUND);
            }
            if (code == 410) {
                throw new CustomException(ErrorCode.ARTICLE_URL_GONE);
            }

        } catch (IOException e) {
            throw new CustomException(ErrorCode.UNKNOWN);
        }
    }

    public abstract boolean canHandle(String link);

    protected abstract List<By> getBy(String link);
}
