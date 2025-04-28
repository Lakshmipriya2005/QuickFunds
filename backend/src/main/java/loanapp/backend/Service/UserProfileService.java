package loanapp.backend.Service;

import loanapp.backend.Entity.UserEntity;
import loanapp.backend.Entity.UserProfile;
import loanapp.backend.Repo.AppliedUsersRepo;
import loanapp.backend.Repo.UserProfileRepo;
import loanapp.backend.Repo.UserRepository;
import loanapp.backend.Entity.AppliedLoanUsers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepo userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppliedUsersRepo loanUsersRepository;

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
    public UserProfile getProfileByUserId(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    // link loan to profile
    public void linkLoanToProfile(Long userId, Long loanId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        AppliedLoanUsers loan = loanUsersRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        profile.setLoan(loan);
        userProfileRepository.save(profile);
    }
}
