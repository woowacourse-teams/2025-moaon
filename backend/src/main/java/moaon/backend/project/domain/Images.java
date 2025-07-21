package moaon.backend.project.domain;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import java.util.List;

@Embeddable
public class Images {

    @ElementCollection
    private List<String> urls;
}
