package moaon.backend.project.repository;

import jakarta.annotation.Nonnull;
import moaon.backend.global.exception.custom.CustomException;
import moaon.backend.global.exception.custom.ErrorCode;
import moaon.backend.project.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long>, CustomizedProjectRepository {

    @Nonnull
    default Project getByIdOrElseThrow(Long id) throws CustomException {
        return findById(id).orElseThrow(() -> new CustomException(ErrorCode.PROJECT_NOT_FOUND));
    }
}
