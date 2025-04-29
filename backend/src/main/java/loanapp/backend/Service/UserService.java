package loanapp.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import loanapp.backend.Dtos.UserDto;
import loanapp.backend.Dtos.UserSecureDto;
import loanapp.backend.Entity.UserEntity;
import loanapp.backend.Entity.UserProfile;
import loanapp.backend.Repo.UserProfileRepo;
import loanapp.backend.Repo.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
     @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;
    @Autowired
    private UserProfileRepo profileRepo;

    public String register(UserDto dto) {
        if (userRepository.findByUsername(dto.getUsername())!=null) {
            throw new RuntimeException("User already exists");
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
       UserProfile profile = new UserProfile();
       profile.setName(dto.getUsername());
       profile.setEmail(dto.getEmail());
       userRepository.save(user);

       UserEntity usr=userRepository.findByUsername(dto.getUsername());
       System.out.println(usr.getId());
       profile.setRefId(usr.getId());
      // profile.setUserId(user);
       
        profileRepo.save(profile);
        
        
        return "User registered successfully!";
    }
    @Transactional
    public String authenticate(UserDto user) {
       Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
   if (authentication.isAuthenticated()) 
        {
         return jwtService.generateToken(user.getUsername());
        } else 
        {
            return "fail";
        }
        //userRepository.updateUserLoggedInStatus(username, "false");
       // return user.getId();
    }
}
