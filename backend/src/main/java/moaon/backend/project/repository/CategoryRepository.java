package moaon.backend.project.repository;

import java.util.Optional;
import moaon.backend.project.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);
}
