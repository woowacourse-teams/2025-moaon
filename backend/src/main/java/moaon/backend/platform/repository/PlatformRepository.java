package moaon.backend.platform.repository;

import moaon.backend.platform.domain.Platform;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlatformRepository extends JpaRepository<Platform, Long> {
}
