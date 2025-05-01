package loanapp.backend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import loanapp.backend.Dtos.UserAppliedDto;
import loanapp.backend.Dtos.UserStatusDto;
import loanapp.backend.Entity.AppliedLoanUsers;
import loanapp.backend.Service.AppliedUsersService;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/loan")

public class AppliedLoanController {

    @Autowired
    private AppliedUsersService service;

    @PostMapping("/apply")
    public AppliedLoanUsers applyLoan(@RequestBody UserAppliedDto dto) {
        return service.apply(dto);
    }
    @GetMapping("/status")
public List<UserStatusDto> getAllUserStatuses() {
    return service.getAllUsersStatus();
}
@GetMapping("/status/{id}")
public List<UserStatusDto> getUsersById(@PathVariable Long id) {
 
    return service.getUsersById(id);
   
}

  @PostMapping("/updateStatus/{id}")
    public ResponseEntity<String> updateApplicationStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        boolean updated = service.updateStatus(id, status);
        if (updated) {
            return ResponseEntity.ok("Application status updated to: " + status);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found");
        }
    }
    

}
