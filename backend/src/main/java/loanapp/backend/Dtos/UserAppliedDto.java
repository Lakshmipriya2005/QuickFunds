package loanapp.backend.Dtos;




import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
    UserAppliedDto(String name,int amount){
        this.name=name;
        this.amount=amount;

    }
    public UserAppliedDto(String name, int amount, String status) {
        this.name = name;
        this.amount = amount;
        this.status = status;
    }
    
    

    
}