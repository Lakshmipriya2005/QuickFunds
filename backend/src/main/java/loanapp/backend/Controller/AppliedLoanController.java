package loanapp.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import loanapp.backend.Dtos.UserAppliedDto;
import loanapp.backend.Entity.AppliedLoanUsers;
import loanapp.backend.Service.AppliedUsersService;


@RestController
@RequestMapping("/loan")

public class AppliedLoanController {

    @Autowired
    private AppliedUsersService service;

    @PostMapping("/apply")
    public AppliedLoanUsers applyLoan(@RequestBody UserAppliedDto dto) {
        return service.apply(dto);
    }
}
