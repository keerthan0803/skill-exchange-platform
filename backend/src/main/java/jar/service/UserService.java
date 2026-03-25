package jar.service;

import jar.dto.MatchResponseDto;
import jar.dto.UserResponseDto;
import jar.model.Follower;
import jar.model.User;
import jar.repository.FollowerRepository;
import jar.repository.UserRepository;
import jar.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FollowerRepository followerRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public List<UserResponseDto> searchUsers(String query) {
        List<User> users = userRepository.searchUsers(query);
        return users.stream()
                .map(this::convertToUserResponseDto)
                .collect(Collectors.toList());
    }
    
    public UserResponseDto getUserProfile(Long userId, String authHeader) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Long currentUserId = getCurrentUserId(authHeader);
        boolean isFollowing = followerRepository.existsByFollowerIdAndFollowingId(currentUserId, userId);
        
        return convertToUserResponseDtoWithFollowing(user, isFollowing);
    }
    
    public List<MatchResponseDto> getMatches(String authHeader, String skillToOffer, String skillToLearn) {
        Long currentUserId = getCurrentUserId(authHeader);
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<User> allUsers = userRepository.findAll();
        
        return allUsers.stream()
                .filter(u -> !u.getId().equals(currentUserId))
                .map(user -> calculateMatch(currentUser, user, skillToOffer, skillToLearn))
                .filter(match -> match.getMatchPercentage() > 50)
                .sorted((a, b) -> b.getMatchPercentage().compareTo(a.getMatchPercentage()))
                .limit(10)
                .collect(Collectors.toList());
    }
    
    public List<UserResponseDto> getFollowers(Long userId) {
        List<Follower> followers = followerRepository.findByFollowingId(userId);
        return followers.stream()
                .map(f -> convertToUserResponseDto(f.getFollower()))
                .collect(Collectors.toList());
    }
    
    public List<UserResponseDto> getFollowing(Long userId) {
        List<Follower> following = followerRepository.findByFollowerId(userId);
        return following.stream()
                .map(f -> convertToUserResponseDto(f.getFollowing()))
                .collect(Collectors.toList());
    }
    
    public UserResponseDto followUser(Long userIdToFollow, String authHeader) {
        Long currentUserId = getCurrentUserId(authHeader);
        
        if (currentUserId.equals(userIdToFollow)) {
            throw new RuntimeException("Cannot follow yourself");
        }
        
        User follower = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
        
        User following = userRepository.findById(userIdToFollow)
                .orElseThrow(() -> new RuntimeException("User to follow not found"));
        
        if (followerRepository.existsByFollowerIdAndFollowingId(currentUserId, userIdToFollow)) {
            throw new RuntimeException("Already following this user");
        }
        
        Follower followerRecord = new Follower(follower, following);
        followerRepository.save(followerRecord);
        
        return convertToUserResponseDtoWithFollowing(following, true);
    }
    
    public void unfollowUser(Long userIdToUnfollow, String authHeader) {
        Long currentUserId = getCurrentUserId(authHeader);
        
        Follower follower = followerRepository.findByFollowerIdAndFollowingId(currentUserId, userIdToUnfollow)
                .orElseThrow(() -> new RuntimeException("Not following this user"));
        
        followerRepository.delete(follower);
    }
    
    public void deleteAccount(String authHeader) {
        Long userId = getCurrentUserId(authHeader);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Delete all follower relationships
        List<Follower> followers = followerRepository.findByFollowerId(userId);
        List<Follower> following = followerRepository.findByFollowingId(userId);
        
        followerRepository.deleteAll(followers);
        followerRepository.deleteAll(following);
        
        // Delete user
        userRepository.delete(user);
    }
    
    private Long getCurrentUserId(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid authorization header");
        }
        
        String token = authHeader.substring(7).trim();
        String email = jwtUtil.extractEmail(token);
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return user.getId();
    }
    
    private UserResponseDto convertToUserResponseDto(User user) {
        long followerCount = followerRepository.countByFollowingIdOrderByCreatedAtDesc(user.getId());
        long followingCount = followerRepository.countByFollowerIdOrderByCreatedAtDesc(user.getId());
        
        return new UserResponseDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getBio(),
                user.getLocation(),
                user.getSkills(),
                user.getInterests(),
                user.getSkillPoints(),
                followerCount,
                followingCount,
                false
        );
    }
    
    private UserResponseDto convertToUserResponseDtoWithFollowing(User user, boolean isFollowing) {
        long followerCount = followerRepository.countByFollowingIdOrderByCreatedAtDesc(user.getId());
        long followingCount = followerRepository.countByFollowerIdOrderByCreatedAtDesc(user.getId());
        
        return new UserResponseDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getBio(),
                user.getLocation(),
                user.getSkills(),
                user.getInterests(),
                user.getSkillPoints(),
                followerCount,
                followingCount,
                isFollowing
        );
    }
    
    private MatchResponseDto calculateMatch(User currentUser, User otherUser, String skillToOffer, String skillToLearn) {
        int matchPercentage = 0;
        
        // Check if other user offers what current user wants to learn
        if (otherUser.getSkills() != null && skillToLearn != null) {
            if (otherUser.getSkills().toLowerCase().contains(skillToLearn.toLowerCase())) {
                matchPercentage += 50;
            }
        }
        
        // Check if other user wants what current user can offer
        if (otherUser.getInterests() != null && skillToOffer != null) {
            if (otherUser.getInterests().toLowerCase().contains(skillToOffer.toLowerCase())) {
                matchPercentage += 30;
            }
        }
        
        // Check for common location (bonus)
        if (currentUser.getLocation() != null && otherUser.getLocation() != null 
            && currentUser.getLocation().equalsIgnoreCase(otherUser.getLocation())) {
            matchPercentage += 10;
        }
        
        // Cap at 100
        if (matchPercentage > 100) matchPercentage = 100;
        
        return new MatchResponseDto(
                otherUser.getId(),
                otherUser.getUsername(),
                otherUser.getFullName(),
                otherUser.getSkills(),
                otherUser.getInterests(),
                otherUser.getLocation(),
                matchPercentage
        );
    }
}
