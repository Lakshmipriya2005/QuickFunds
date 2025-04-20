package loanapp.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import loanapp.backend.Dtos.UserDto;
import loanapp.backend.Dtos.UserSecureDto;
import loanapp.backend.Entity.UserEntity;
import loanapp.backend.Repo.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(UserDto dto) {
        if (userRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException ("User already exists");
        }
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        UserEntity user = new UserEntity();
        UserDto usersecDto = new UserDto();
        usersecDto.setUsername(dto.getUsername());
        usersecDto.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setIsloggedin("false");
        userRepository.save(user);
        //.updateUserLoggedInStatus(dto.getUsername(), "false");
       // usersecDto.setIsLoggedIn("false");
        
        return "User registered successfully!";
    }
    @Transactional
    public ResponseEntity<String> authenticate(String username, String password) {
        System.out.println("Authenticating user: " + username);
        UserEntity user = userRepository.findByUsername(username).orElse(null);
        
        if (user == null) {
            System.out.println("Login failed - username not found: " + username);
            return ResponseEntity.status(401).body("Username not found");
        }
    
        if (!passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("Login failed - invalid password for user: " + username);
            ResponseEntity.status(401).body("Invalid password");
        }
        user.setIsloggedin("true");

        userRepository.updateUserLoggedInStatus(username, "false");
        return ResponseEntity.ok("Logged In Successfully");
    }
}
