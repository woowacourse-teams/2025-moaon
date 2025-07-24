package moaon.backend.project.domain;

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
    private List<String> urls;

    public Images(List<String> urls) {
        this.urls = new ArrayList<>(urls);
    }

    /**
     * Returns an unmodifiable copy of the image URLs list.
     *
     * @return an unmodifiable list containing all image URLs
     */
    public List<String> getUrls() {
        return List.copyOf(urls);
    }

    /**
     * Returns the first image URL from the list, or {@code null} if the list is empty.
     *
     * @return the first image URL as a thumbnail, or {@code null} if no URLs are present
     */
    public String getThumbnailUrl() {
        if (urls.isEmpty()) {
            return null;
        }
        return urls.getFirst();
    }
}
