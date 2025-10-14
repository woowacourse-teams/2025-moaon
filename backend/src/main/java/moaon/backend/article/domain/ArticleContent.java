package moaon.backend.article.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.net.URL;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ArticleContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private URL url;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    public ArticleContent(URL url, String content) {
        this.url = url;
        this.content = content;
    }

    public void update(String content) {
        this.content = content;
    }
}
