package moaon.backend.organization.repository;

import java.util.List;
import moaon.backend.organization.domain.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    List<Organization> findAllByNameIn(List<String> organizationNames);
}
