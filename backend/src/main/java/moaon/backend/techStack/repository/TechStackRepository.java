package moaon.backend.techStack.repository;

import java.util.Optional;
import moaon.backend.techStack.domain.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechStackRepository extends JpaRepository<TechStack, Long> {

    Optional<TechStack> findByName(String name);
}
