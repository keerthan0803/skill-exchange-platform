package jar.repository;

import jar.model.SkillRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRequestRepository extends JpaRepository<SkillRequest, Long> {
    List<SkillRequest> findBySenderIdOrderByCreatedAtDesc(Long senderId);
    List<SkillRequest> findByReceiverIdOrderByCreatedAtDesc(Long receiverId);
    boolean existsBySenderIdAndReceiverIdAndStatus(Long senderId, Long receiverId, String status);
}
