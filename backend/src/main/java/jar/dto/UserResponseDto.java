package jar.dto;

public class UserResponseDto {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String bio;
    private String location;
    private String skills;
    private String interests;
    private Integer skillPoints;
    private Long followerCount;
    private Long followingCount;
    private Boolean isFollowing;

    public UserResponseDto() {
    }

    public UserResponseDto(Long id, String username, String email, String fullName, String bio, 
                          String location, String skills, String interests, Integer skillPoints,
                          Long followerCount, Long followingCount, Boolean isFollowing) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.bio = bio;
        this.location = location;
        this.skills = skills;
        this.interests = interests;
        this.skillPoints = skillPoints;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
        this.isFollowing = isFollowing;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }

    public Integer getSkillPoints() { return skillPoints; }
    public void setSkillPoints(Integer skillPoints) { this.skillPoints = skillPoints; }

    public Long getFollowerCount() { return followerCount; }
    public void setFollowerCount(Long followerCount) { this.followerCount = followerCount; }

    public Long getFollowingCount() { return followingCount; }
    public void setFollowingCount(Long followingCount) { this.followingCount = followingCount; }

    public Boolean getIsFollowing() { return isFollowing; }
    public void setIsFollowing(Boolean isFollowing) { this.isFollowing = isFollowing; }
}
