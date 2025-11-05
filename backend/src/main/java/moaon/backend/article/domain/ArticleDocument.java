package moaon.backend.article.domain;

import static java.util.stream.Collectors.toSet;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import moaon.backend.event.domain.EsEventOutbox;
import moaon.backend.event.domain.EventAction;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.techStack.domain.TechStack;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Alias;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.InnerField;
import org.springframework.data.elasticsearch.annotations.MultiField;
import org.springframework.data.elasticsearch.annotations.Setting;
import org.springframework.util.CollectionUtils;

@Document(indexName = "articles_idx", aliases = {@Alias(value = "articles", isWriteIndex = true)})
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

    @MultiField(
            mainField = @Field(type = FieldType.Text, analyzer = "article_common_analyzer"),
            otherFields = {
                    @InnerField(suffix = "auto", type = FieldType.Text,
                            analyzer = "article_autocomplete_index",
                            searchAnalyzer = "article_autocomplete_search")
            }
    )
    private String title;

    @MultiField(
            mainField = @Field(type = FieldType.Text, analyzer = "article_common_analyzer"),
            otherFields = {
                    @InnerField(suffix = "auto", type = FieldType.Text,
                            analyzer = "article_autocomplete_index",
                            searchAnalyzer = "article_autocomplete_search")
            }
    )
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

    public ArticleDocument(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.summary = article.getSummary();
        this.content = article.getContent();
        this.sector = article.getSector();
        this.topics = new HashSet<>(article.getTopics());
        this.techStacks = setTechStacks(article.getTechStacks());
        this.clicks = article.getClicks();
        this.createdAt = article.getCreatedAt().truncatedTo(ChronoUnit.MILLIS);
    }

    public EsEventOutbox toEventOutbox(EventAction eventAction, ObjectMapper objectMapper) {
        return EsEventOutbox.builder()
                .entityId(this.getId())
                .eventType("articles")
                .action(eventAction)
                .payload(convertToJson(this, objectMapper))
                .build();
    }

    private Set<String> setTechStacks(List<TechStack> techStacks) {
        if (CollectionUtils.isEmpty(techStacks)) {
            return new HashSet<>();
        }
        return techStacks.stream().map(TechStack::getName).collect(toSet());
    }

    private String convertToJson(Object object, ObjectMapper objectMapper) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.ARTICLE_PROCESSING_FAILED);
        }
    }
}
