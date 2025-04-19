package loanapp.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import loanapp.backend.Dtos.UserAppliedDto;
import loanapp.backend.Entity.AppliedLoanUsers;
import loanapp.backend.Repo.AppliedUsersRepo;


@Service
public class AppliedUsersService {

    @Autowired
    private AppliedUsersRepo repository;

    public  loanapp.backend.Entity.AppliedLoanUsers apply(UserAppliedDto dto) {
       AppliedLoanUsers loan = new  AppliedLoanUsers();
        loan.setName(dto.getName());
        loan.setEmail(dto.getEmail());
        loan.setPhoneNumber(dto.getPhoneNumber());
        loan.setAddress(dto.getAddress());
        loan.setCity(dto.getCity());
        loan.setState(dto.getState());
        loan.setLoanType(dto.getLoanType());
        loan.setAmount(dto.getAmount());
        loan.setProperty(dto.getProperty());

        return repository.save(loan);
    }
}
