package moaon.backend.category.repository;

import java.util.List;
import moaon.backend.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByNameIn(List<String> categoryNames);
}
