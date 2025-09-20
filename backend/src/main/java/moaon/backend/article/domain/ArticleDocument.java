package moaon.backend.article.domain;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "articles")
@Setting(settingPath = "/elasticsearch/article-settings.json")
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ArticleDocument {

    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "article_common_analyzer")
    private String title;

    @Field(type = FieldType.Text, analyzer = "article_common_analyzer")
    private String summary;

    @Field(type = FieldType.Text, analyzer = "article_common_analyzer")
    private String content;
}
