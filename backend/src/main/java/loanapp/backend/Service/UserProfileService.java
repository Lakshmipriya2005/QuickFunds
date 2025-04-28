package loanapp.backend.Service;
import loanapp.backend.Entity.UserEntity;
import loanapp.backend.Entity.UserProfile;
//import loanapp.backend.Repo.AppliedUsersRepo;
import loanapp.backend.Repo.UserProfileRepo;
import loanapp.backend.Repo.UserRepository;
import loanapp.backend.Dtos.UserProfileDto;
//import loanapp.backend.Entity.AppliedLoanUsers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepo userProfileRepository;

    @Autowired
    private UserRepository userRepository;

 

    // create or update profile
   
    public UserProfile createOrUpdateProfile(Long userId, String profileImg, String name) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<UserProfile> existingProfile = userProfileRepository.findByUser(user);

        UserProfile profile;
        if (existingProfile.isPresent()) {
            profile = existingProfile.get();
        } else {
            profile = new UserProfile();
            profile.setUser(user);
        }
        profile.setProfileImg(profileImg);
        profile.setName(name);

        return userProfileRepository.save(profile);
    }

    // fetch profile details
   
    
        // Fetch profile details including default profile values
        public UserProfileDto getProfileByUserId(Long userId) {
            // Fetch the user along with profile eagerly
            UserEntity user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
    
            UserProfile userProfile = user.getProfile();  // Profile is fetched eagerly here
    
            if (userProfile == null) {
                userProfile = new UserProfile();  // In case no profile exists, provide a default one
                userProfile.setProfileImg("default.png");  // Ensure default value
                
            }
    
            return new UserProfileDto(user.getUsername(), user.getEmail(), userProfile.getProfileImg());
        }
    }
    
    

    
    

