package moaon.backend.techStack.repository;

import java.util.List;
import moaon.backend.techStack.domain.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechStackRepository extends JpaRepository<TechStack, Long> {

    List<TechStack> findAllByNameIn(List<String> techStackNames);
}
