package moaon.backend.techStack.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import moaon.backend.project.domain.Project;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode(of = "id")
public class ProjectTechStack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    private TechStack techStack;

    public ProjectTechStack(Project project, TechStack techStack) {
        this.project = project;
        this.techStack = techStack;
    }

    @Override
    public String toString() {
        return "ProjectTechStack{" +
                "id=" + id +
                ", project=" + project.getId() +
                ", techStack=" + techStack +
                '}';
    }
}
