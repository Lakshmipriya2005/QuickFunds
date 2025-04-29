package loanapp.backend.Controller;

import loanapp.backend.Dtos.UserProfileDto;
import loanapp.backend.Entity.UserProfile;
import loanapp.backend.Service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:5173") // React URL
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    // create or update profile
    @PostMapping("/createOrUpdate/{id}")
    public UserProfile createOrUpdateProfile(@RequestBody UserProfile profileDtos,@PathVariable long id) {
        return userProfileService.createOrUpdateProfile(profileDtos,id);
    }

    // fetch profile
    
    @GetMapping("/get/{id}")
    public UserProfileDto getProfile(@PathVariable Long id) {
        
        return userProfileService.getProfileByUserId(id);
    }

    // link loan to profile after applying loan
    
}
