package loanapp.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import loanapp.backend.Dtos.UserAppliedDto;
import loanapp.backend.Dtos.UserStatusDto;
import loanapp.backend.Entity.AppliedLoanUsers;
import loanapp.backend.Service.AppliedUsersService;


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

}
