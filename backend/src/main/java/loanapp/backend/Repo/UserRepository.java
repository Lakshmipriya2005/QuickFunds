package loanapp.backend.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;
//import loanapp.backend.Dtos.UserSecureDto;
import loanapp.backend.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
    Optional<UserEntity> findByEmail(String email);
    @Transactional
    @Modifying
    @Query("UPDATE UserEntity u SET u.isloggedin = :isloggedin WHERE u.username = :username")
    void updateUserLoggedInStatus(@Param("username") String username, @Param("isloggedin") String isloggedin);
    
// @Modifying
// @Query("UPDATE User u SET u.loggedIn = true WHERE u.username = :username")
// void updateUserLoggedInStatus(@Param("username") String username);


}
