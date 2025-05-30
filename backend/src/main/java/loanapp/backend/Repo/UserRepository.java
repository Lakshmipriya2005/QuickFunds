package loanapp.backend.Repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

//import loanapp.backend.Dtos.UserSecureDto;
import loanapp.backend.Entity.UserEntity;


public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query(value = "SELECT * FROM users WHERE BINARY username = :username", nativeQuery = true)
    UserEntity findByUsername(@Param("username") String username);
    
    Optional<UserEntity> findByEmail(String email);


    @Query("SELECT u.id FROM UserEntity u WHERE u.username = :username")
    int getIdByName(String username);
    //Optional<UserProfile> findByRefId(Long userId);
   
// @Modifying
// @Query("UPDATE User u SET u.loggedIn = true WHERE u.username = :username")
// void updateUserLoggedInStatus(@Param("username") String username);


}
