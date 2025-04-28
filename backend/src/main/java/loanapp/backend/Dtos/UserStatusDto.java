
package loanapp.backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserStatusDto {
    private long id;
    private String name;
    private String email;
    private String status;
    
}
