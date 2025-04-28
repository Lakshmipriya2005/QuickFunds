package loanapp.backend.Dtos;



public class UserProfileDto {
    private String username;
    private String email;
    private String profileImg;

    public UserProfileDto(String username, String email,String profileImg) {
        this.username = username;
        this.email = email;
        this.profileImg = profileImg;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }
    public String getProfileImg() {
        return profileImg;
    }
}
