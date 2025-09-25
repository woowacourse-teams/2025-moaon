package moaon.backend.es;

import static java.util.stream.Collectors.toSet;

import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import moaon.backend.article.domain.Article;
import moaon.backend.article.domain.Sector;
import moaon.backend.article.domain.Topic;
import moaon.backend.techStack.domain.TechStack;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.InnerField;
import org.springframework.data.elasticsearch.annotations.MultiField;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "articles")
@Setting(settingPath = "/elasticsearch/article-settings.json")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id")
@ToString
@Getter
public class ArticleDocument {

    @Id
    @Field(type = FieldType.Keyword)
    private Long id;

    @Field(type = FieldType.Text, analyzer = "article_common_analyzer")
    private String title;

    @Field(type = FieldType.Text, analyzer = "article_common_analyzer")
    private String summary;

    @Field(type = FieldType.Text, analyzer = "article_common_analyzer")
    private String content;

    @Field(type = FieldType.Keyword)
    private Sector sector;

    @Field(type = FieldType.Keyword)
    private Set<Topic> topics;

    @MultiField(
            mainField = @Field(type = FieldType.Keyword),
            otherFields = {
                    @InnerField(suffix = "text", type = FieldType.Text, analyzer = "article_common_analyzer")
            }
    )
    private Set<String> techStacks;

    @Field(type = FieldType.Integer)
    private int clicks;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second_fraction)
    private LocalDateTime createdAt;

    public ArticleDocument(final Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.summary = article.getSummary();
        this.content = article.getContent();
        this.sector = article.getSector();
        this.topics = new HashSet<>(article.getTopics());
        this.techStacks = article.getTechStacks().stream().map(TechStack::getName).collect(toSet());
        this.clicks = article.getClicks();
        this.createdAt = article.getCreatedAt();
    }
}
