package loanapp.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        userRepository.save(user);
        return "User registered successfully!";
    }
    public String authenticate(String username, String password) {
        UserEntity user = userRepository.findByUsername(username)
                .orElse( null);
        if (user == null) {
            throw new RuntimeException("Username not found");
        }
        if (passwordEncoder.matches(password, user.getPassword())) {
            return "Logged In Successfully ";
        } else {
            throw new RuntimeException("Invalid password");
        }
    }

    public List<UserSecureDto> getAll() {
        return userRepository.allUsers();
    }

}
