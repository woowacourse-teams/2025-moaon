package moaon.backend.project.repository;

import moaon.backend.project.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectCategoryRepository extends JpaRepository<Category, Long> {
}
