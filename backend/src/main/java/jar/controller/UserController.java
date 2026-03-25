package jar.controller;

import jar.dto.MatchResponseDto;
import jar.dto.UserResponseDto;
import jar.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "${FRONTEND_URL:https://keerthan-23eg106b48.vercel.app}")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam String q) {
        try {
            List<UserResponseDto> results = userService.searchUsers(q);
            return ResponseEntity.ok(results);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfile(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            UserResponseDto profile = userService.getUserProfile(userId, authHeader);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    @GetMapping("/{userId}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable Long userId) {
        try {
            List<UserResponseDto> followers = userService.getFollowers(userId);
            return ResponseEntity.ok(followers);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    @GetMapping("/{userId}/following")
    public ResponseEntity<?> getFollowing(@PathVariable Long userId) {
        try {
            List<UserResponseDto> following = userService.getFollowing(userId);
            return ResponseEntity.ok(following);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    @PostMapping("/{userId}/follow")
    public ResponseEntity<?> followUser(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            UserResponseDto result = userService.followUser(userId, authHeader);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{userId}/follow")
    public ResponseEntity<?> unfollowUser(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            userService.unfollowUser(userId, authHeader);
            return ResponseEntity.ok("Unfollowed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @GetMapping("/matches")
    public ResponseEntity<?> getMatches(
            @RequestParam String skillToOffer,
            @RequestParam String skillToLearn,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            List<MatchResponseDto> matches = userService.getMatches(authHeader, skillToOffer, skillToLearn);
            return ResponseEntity.ok(matches);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
