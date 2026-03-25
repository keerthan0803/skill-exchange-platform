package jar.dto;

public class MatchResponseDto {
    private Long id;
    private String username;
    private String fullName;
    private String skills;
    private String interests;
    private String location;
    private Integer matchPercentage;

    public MatchResponseDto() {
    }

    public MatchResponseDto(Long id, String username, String fullName, String skills, 
                           String interests, String location, Integer matchPercentage) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.skills = skills;
        this.interests = interests;
        this.location = location;
        this.matchPercentage = matchPercentage;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(Integer matchPercentage) { this.matchPercentage = matchPercentage; }
}
