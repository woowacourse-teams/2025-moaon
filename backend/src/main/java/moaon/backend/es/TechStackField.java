package moaon.backend.es;

import moaon.backend.techStack.domain.TechStack;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.InnerField;
import org.springframework.data.elasticsearch.annotations.MultiField;

public record TechStackField(
        @Field(type = FieldType.Keyword)
        Long id,

        @MultiField(
                mainField = @Field(type = FieldType.Keyword),
                otherFields = {
                        @InnerField(suffix = "text", type = FieldType.Text, analyzer = "article_common_analyzer")
                }
        )
        String name
) {

    public TechStackField(final Long id, final String name) {
        this.id = id;
        this.name = name;
    }

    public TechStackField(final TechStack techStack) {
        this(techStack.getId(), techStack.getName());
    }
}
