package loanapp.backend.Repo;



import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import loanapp.backend.Entity.UserProfile;
import loanapp.backend.Entity.UserEntity;

public interface UserProfileRepo extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(UserEntity user);
}
