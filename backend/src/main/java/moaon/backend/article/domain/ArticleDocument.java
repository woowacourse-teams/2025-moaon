package moaon.backend.article.domain;

import jakarta.persistence.Id;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import moaon.backend.techStack.domain.TechStackField;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "articles")
@Setting(settingPath = "/elasticsearch/article-settings.json")
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
@Getter
public class ArticleDocument {

    @Id
    private String id;

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

    @Field(type = FieldType.Object, normalizer = "lowercase")
    private Set<TechStackField> techStacks;
}
