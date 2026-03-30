package jar.dto;

import java.time.LocalDateTime;

public class ChatListDto {
    private Long id;
    private Long otherUserId;
    private String otherUserName;
    private String otherUserImage;
    private String otherUserBio;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private Integer unreadCount;
    
    public ChatListDto() {}
    
    public ChatListDto(Long id, Long otherUserId, String otherUserName, String otherUserImage, String otherUserBio, String lastMessage, LocalDateTime lastMessageTime, Integer unreadCount) {
        this.id = id;
        this.otherUserId = otherUserId;
        this.otherUserName = otherUserName;
        this.otherUserImage = otherUserImage;
        this.otherUserBio = otherUserBio;
        this.lastMessage = lastMessage;
        this.lastMessageTime = lastMessageTime;
        this.unreadCount = unreadCount;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getOtherUserId() { return otherUserId; }
    public void setOtherUserId(Long otherUserId) { this.otherUserId = otherUserId; }
    
    public String getOtherUserName() { return otherUserName; }
    public void setOtherUserName(String otherUserName) { this.otherUserName = otherUserName; }
    
    public String getOtherUserImage() { return otherUserImage; }
    public void setOtherUserImage(String otherUserImage) { this.otherUserImage = otherUserImage; }
    
    public String getOtherUserBio() { return otherUserBio; }
    public void setOtherUserBio(String otherUserBio) { this.otherUserBio = otherUserBio; }
    
    public String getLastMessage() { return lastMessage; }
    public void setLastMessage(String lastMessage) { this.lastMessage = lastMessage; }
    
    public LocalDateTime getLastMessageTime() { return lastMessageTime; }
    public void setLastMessageTime(LocalDateTime lastMessageTime) { this.lastMessageTime = lastMessageTime; }
    
    public Integer getUnreadCount() { return unreadCount; }
    public void setUnreadCount(Integer unreadCount) { this.unreadCount = unreadCount; }
}
