// filepath: c:\Users\keert\OneDrive\Pictures\Desktop\Skill Exchange Platform\backend\src\main\java\com\skillexchange\model\User.java
package jar.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    private String password;
    
    private String provider; // "LOCAL", "GOOGLE"
    
    private String fullName;
    private String bio;
    private String location;
    private String skills;
    private String interests;
    
    @Column(nullable = false)
    private String role = "USER";
    
    private Integer skillPoints = 0;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private Boolean isActive = true;

    public User() {}

    public User(Long id, String username, String email, String password, String fullName, String bio, String location, String skills, String interests, String role, Integer skillPoints, LocalDateTime createdAt, Boolean isActive) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.bio = bio;
        this.location = location;
        this.skills = skills;
        this.interests = interests;
        this.role = role;
        this.skillPoints = skillPoints;
        this.createdAt = createdAt;
        this.isActive = isActive;
        this.provider = "LOCAL";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

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

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Integer getSkillPoints() { return skillPoints; }
    public void setSkillPoints(Integer skillPoints) { this.skillPoints = skillPoints; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}