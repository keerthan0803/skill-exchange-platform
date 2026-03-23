package jar.service;

import jar.dto.AuthResponse;
import jar.dto.LoginRequest;
import jar.dto.ProfileResponseDto;
import jar.dto.SignupRequest;
import jar.dto.UpdateProfileRequestDto;
import jar.model.User;
import jar.repository.UserRepository;
import jar.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse signup(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists!");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setBio(request.getBio());
        user.setRole("USER");
        user.setProvider("LOCAL");

        userRepository.save(user);

        // Generate token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new AuthResponse(
            token,
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            "User registered successfully!"
        );
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password!"));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password!");
        }

        // Check if user is active
        if (!user.getIsActive()) {
            throw new RuntimeException("Account is deactivated!");
        }

        // Generate token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new AuthResponse(
            token,
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            "Login successful!"
        );
    }

    public ProfileResponseDto getProfile(String authHeader) {
        User user = getCurrentUserFromHeader(authHeader);
        return toProfileResponse(user);
    }

    public ProfileResponseDto updateProfile(String authHeader, UpdateProfileRequestDto request) {
        User user = getCurrentUserFromHeader(authHeader);

        if (request == null) {
            throw new RuntimeException("Request body is required");
        }

        if (request.getEmail() != null) {
            String normalizedEmail = request.getEmail().trim().toLowerCase();
            if (normalizedEmail.isEmpty()) {
                throw new RuntimeException("email cannot be empty");
            }

            if (!normalizedEmail.equalsIgnoreCase(user.getEmail()) && userRepository.existsByEmail(normalizedEmail)) {
                throw new RuntimeException("Email already exists!");
            }

            user.setEmail(normalizedEmail);
        }

        user.setFullName(trimToNull(request.getFullName()));
        user.setBio(trimToNull(request.getBio()));
        user.setLocation(trimToNull(request.getLocation()));
        user.setSkills(trimToNull(request.getSkills()));
        user.setInterests(trimToNull(request.getInterests()));

        User saved = userRepository.save(user);
        return toProfileResponse(saved);
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

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private ProfileResponseDto toProfileResponse(User user) {
        return new ProfileResponseDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getBio(),
                user.getLocation(),
                user.getSkills(),
                user.getInterests()
        );
    }
}