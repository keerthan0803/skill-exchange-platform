package jar.dto;

public class UpdateProfileRequestDto {
    private String email;
    private String fullName;
    private String bio;
    private String location;
    private String skills;
    private String interests;

    public UpdateProfileRequestDto() {
    }

    public UpdateProfileRequestDto(String email, String fullName, String bio, String location, String skills, String interests) {
        this.email = email;
        this.fullName = fullName;
        this.bio = bio;
        this.location = location;
        this.skills = skills;
        this.interests = interests;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }
}
