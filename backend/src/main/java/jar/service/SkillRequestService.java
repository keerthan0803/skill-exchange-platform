package jar.service;

import jar.dto.CreateSkillRequestDto;
import jar.dto.SkillRequestResponseDto;
import jar.dto.UpdateSkillRequestStatusDto;
import jar.model.SkillRequest;
import jar.model.User;
import jar.repository.SkillRequestRepository;
import jar.repository.UserRepository;
import jar.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillRequestService {

    @Autowired
    private SkillRequestRepository skillRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public SkillRequestResponseDto createRequest(String authHeader, CreateSkillRequestDto requestDto) {
        User sender = getCurrentUserFromHeader(authHeader);

        if (requestDto.getReceiverId() == null) {
            throw new RuntimeException("receiverId is required");
        }

        String offeredSkill = normalizeSkill(requestDto.getOfferedSkill(), "offeredSkill");
        String requestedSkill = normalizeSkill(requestDto.getRequestedSkill(), "requestedSkill");

        User receiver = userRepository.findById(requestDto.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (sender.getId().equals(receiver.getId())) {
            throw new RuntimeException("You cannot send a request to yourself");
        }

        if (Boolean.FALSE.equals(receiver.getIsActive())) {
            throw new RuntimeException("Receiver account is inactive");
        }

        boolean duplicatePending = skillRequestRepository.existsBySenderIdAndReceiverIdAndStatus(
                sender.getId(), receiver.getId(), "PENDING"
        );
        if (duplicatePending) {
            throw new RuntimeException("You already have a pending request for this user");
        }

        SkillRequest skillRequest = new SkillRequest();
        skillRequest.setSender(sender);
        skillRequest.setReceiver(receiver);
        skillRequest.setOfferedSkill(offeredSkill);
        skillRequest.setRequestedSkill(requestedSkill);
        skillRequest.setStatus("PENDING");

        SkillRequest saved = skillRequestRepository.save(skillRequest);
        return toResponse(saved);
    }

    public List<SkillRequestResponseDto> getSentRequests(String authHeader) {
        User currentUser = getCurrentUserFromHeader(authHeader);
        return skillRequestRepository.findBySenderIdOrderByCreatedAtDesc(currentUser.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<SkillRequestResponseDto> getReceivedRequests(String authHeader) {
        User currentUser = getCurrentUserFromHeader(authHeader);
        return skillRequestRepository.findByReceiverIdOrderByCreatedAtDesc(currentUser.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public SkillRequestResponseDto updateStatus(String authHeader, Long requestId, UpdateSkillRequestStatusDto statusDto) {
        User currentUser = getCurrentUserFromHeader(authHeader);

        if (requestId == null) {
            throw new RuntimeException("Request id is required");
        }

        String nextStatus = normalizeStatus(statusDto == null ? null : statusDto.getStatus());

        SkillRequest request = skillRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!request.getReceiver().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You are not allowed to update this request");
        }

        if (!"PENDING".equalsIgnoreCase(request.getStatus())) {
            throw new RuntimeException("Only pending requests can be updated");
        }

        request.setStatus(nextStatus);
        SkillRequest saved = skillRequestRepository.save(request);
        return toResponse(saved);
    }

    private User getCurrentUserFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7).trim();
        if (token.isEmpty()) {
            throw new RuntimeException("Missing token in Authorization header");
        }

        String email;
        try {
            email = jwtUtil.extractEmail(token);
        } catch (Exception ex) {
            throw new RuntimeException("Invalid token");
        }

        if (jwtUtil.isTokenExpired(token)) {
            throw new RuntimeException("Token expired");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found for token"));
    }

    private String normalizeSkill(String value, String fieldName) {
        if (value == null || value.trim().isEmpty()) {
            throw new RuntimeException(fieldName + " is required");
        }
        return value.trim();
    }

    private String normalizeStatus(String status) {
        if (status == null || status.trim().isEmpty()) {
            throw new RuntimeException("status is required");
        }

        String normalized = status.trim().toUpperCase();
        if (!"ACCEPTED".equals(normalized) && !"DECLINED".equals(normalized)) {
            throw new RuntimeException("status must be ACCEPTED or DECLINED");
        }
        return normalized;
    }

    private SkillRequestResponseDto toResponse(SkillRequest skillRequest) {
        String senderName = displayName(skillRequest.getSender());
        String receiverName = displayName(skillRequest.getReceiver());

        return new SkillRequestResponseDto(
                skillRequest.getId(),
                senderName,
                receiverName,
                skillRequest.getOfferedSkill(),
                skillRequest.getRequestedSkill(),
                skillRequest.getStatus(),
                skillRequest.getCreatedAt()
        );
    }

    private String displayName(User user) {
        if (user.getFullName() != null && !user.getFullName().isBlank()) {
            return user.getFullName();
        }
        return user.getUsername();
    }
}
