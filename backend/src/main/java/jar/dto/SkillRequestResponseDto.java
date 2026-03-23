package jar.dto;

import java.time.LocalDateTime;

public class SkillRequestResponseDto {
    private Long id;
    private String senderName;
    private String receiverName;
    private String offeredSkill;
    private String requestedSkill;
    private String status;
    private LocalDateTime createdAt;

    public SkillRequestResponseDto(Long id, String senderName, String receiverName, String offeredSkill, String requestedSkill, String status, LocalDateTime createdAt) {
        this.id = id;
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.offeredSkill = offeredSkill;
        this.requestedSkill = requestedSkill;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getSenderName() {
        return senderName;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public String getOfferedSkill() {
        return offeredSkill;
    }

    public String getRequestedSkill() {
        return requestedSkill;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
