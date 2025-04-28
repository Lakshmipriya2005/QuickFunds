package loanapp.backend.Controller;

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
    @PostMapping("/createOrUpdate")
    public UserProfile createOrUpdateProfile(@RequestParam Long userId,
                                             @RequestParam String profileImg,
                                             @RequestParam String name) {
        return userProfileService.createOrUpdateProfile(userId, profileImg, name);
    }

    // fetch profile
    @GetMapping("/{userId}")
    public UserProfile getProfile(@PathVariable Long userId) {
        return userProfileService.getProfileByUserId(userId);
    }

    // link loan to profile after applying loan
    @PostMapping("/linkLoan")
    public String linkLoan(@RequestParam Long userId, @RequestParam Long loanId) {
        userProfileService.linkLoanToProfile(userId, loanId);
        return "Loan linked to profile successfully";
    }
}
