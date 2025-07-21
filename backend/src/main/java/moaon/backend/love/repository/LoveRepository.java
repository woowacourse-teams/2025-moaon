package moaon.backend.love.repository;

import moaon.backend.love.domain.Love;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoveRepository extends JpaRepository<Love, Long> {

    int countLoveByProjectId(Long projectId);
}
