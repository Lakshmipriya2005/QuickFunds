package loanapp.backend.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import loanapp.backend.Dtos.UserSecureDto;
import loanapp.backend.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByEmail(String email);

    @Query("SELECT new loanapp.backend.Dtos.UserSecureDto(u.username, u.email) FROM UserEntity u")
    List<UserSecureDto> allUsers();    
}
