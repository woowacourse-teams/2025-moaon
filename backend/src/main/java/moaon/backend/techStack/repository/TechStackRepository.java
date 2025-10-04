package moaon.backend.techStack.repository;

import moaon.backend.techStack.domain.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechStackRepository extends JpaRepository<TechStack, Long> {

    TechStack findByName(String name);
}
