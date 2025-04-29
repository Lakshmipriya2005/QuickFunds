package loanapp.backend.Dtos;

import lombok.Data;

@Data
public class UserProfileDto {
    private String username;
    private String email;
    private String profileImg;
    private String phoneNumber;
    private String address;
    private String city;

    private String state;

    public UserProfileDto(String username, String email,String profileImg) {
        this.username = username;
        this.email = email;
        this.profileImg = profileImg;
    }
    public UserProfileDto(String username, String email,String profileImg,String phoneNumber,String address,String city,String state) {
        this.username = username;
        this.email = email;
        this.profileImg = profileImg;
        this.phoneNumber=phoneNumber;
        this.address=address;
        this.city=city;
        this.state=state;
    }

    
}
