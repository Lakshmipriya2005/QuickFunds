package loanapp.backend.Dtos;




import lombok.Data;

@Data
public class UserAppliedDto {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private String city;
    private String state;
    private String loanType;
    private int amount;
    private String property;
    private long userId;
    

    
}