package jar.service;

import jar.dto.AuthResponse;
import jar.dto.LoginRequest;
import jar.dto.SignupRequest;
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
}