package moaon.backend.techStack.domain;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.InnerField;
import org.springframework.data.elasticsearch.annotations.MultiField;

public record TechStackField(
        @Field(type = FieldType.Keyword)
        String id,

        @MultiField(
                mainField = @Field(type = FieldType.Keyword, normalizer = "lowercase"),
                otherFields = {
                        @InnerField(suffix = "text", type = FieldType.Text, analyzer = "article_common_analyzer")
                }
        )
        String name
) {

    public TechStackField(final String id, final String name) {
        this.id = id;
        this.name = name;
    }

    public TechStackField(final TechStack techStack) {
        this(techStack.getId().toString(), techStack.getName());
    }
}
