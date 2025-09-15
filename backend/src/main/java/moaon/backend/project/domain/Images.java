package moaon.backend.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
@ToString
public class Images {

    @ElementCollection
    @Column(length = 500)
    private List<String> urls;

    public Images(List<String> urls) {
        this.urls = new ArrayList<>(urls);
    }

    public List<String> getUrls() {
        return List.copyOf(urls);
    }

    public String getThumbnailUrl() {
        if (urls.isEmpty()) {
            return null;
        }
        return urls.getFirst();
    }
}
