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
    public UserProfile createOrUpdateProfile(UserProfile profileDtos,long id) {
        // Assuming you're identifying user by email
        Optional<UserProfile> existingOpt = userProfileRepository.findByRefId(id);
    
        UserProfile existing = existingOpt.orElse(new UserProfile());
    
        // Now update only non-null fields
        if (profileDtos.getName() != null) {
            existing.setName(profileDtos.getName());
        }
        if (profileDtos.getProfileImg() != null) {
            existing.setProfileImg(profileDtos.getProfileImg());
        }
        if (profileDtos.getPhoneNumber() != null) {
            existing.setPhoneNumber(profileDtos.getPhoneNumber());
        }
        if (profileDtos.getAddress() != null) {
            existing.setAddress(profileDtos.getAddress());
        }
        if (profileDtos.getCity() != null) {
            existing.setCity(profileDtos.getCity());
        }
        if (profileDtos.getState() != null) {
            existing.setState(profileDtos.getState());
        }
    
        // Email usually doesn't change, but if you allow it:
        if (profileDtos.getEmail() != null) {
            existing.setEmail(profileDtos.getEmail());
        }
    
        return userProfileRepository.save(existing);
    }
    

    // fetch profile details
   
    
        // Fetch profile details including default profile values
        public UserProfileDto getProfileByUserId(Long userId) {
            // Fetch the user along with profile eagerly
           // UserEntity user = userRepository.findById(userId)
                  //  .orElseThrow(() -> new RuntimeException("User not found"));
    
            Optional<UserProfile> userProfile = userProfileRepository.findByRefId(userId); // Profile is fetched eagerly here
    
            // if (userProfile == null) {
            //     userProfile = Optional.ofNullable(new UserProfile());  // In case no profile exists, provide a default one
                userProfile.ifPresent(profile -> profile.setProfileImg("default.png"));  // Ensure default value
                
            // }
    
            return new UserProfileDto(
                userProfile.map(UserProfile::getName).orElse("Unknown"), 
                userProfile.map(UserProfile::getEmail).orElse("Unknown"), 
                userProfile.map(UserProfile::getProfileImg).orElse("default.png"),
                userProfile.map(UserProfile::getPhoneNumber).orElse("Not Available"),
                userProfile.map(UserProfile::getAddress).orElse("Not Available"),
                userProfile.map(UserProfile::getCity).orElse("Not Available"),
                userProfile.map(UserProfile::getState).orElse("Not Available")
                
            );
                  
        }
    }
    
    

    
    

