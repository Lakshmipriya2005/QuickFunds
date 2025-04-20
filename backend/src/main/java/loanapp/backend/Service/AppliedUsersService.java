package loanapp.backend.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import loanapp.backend.Dtos.UserAppliedDto;
import loanapp.backend.Dtos.UserStatusDto;
import loanapp.backend.Entity.AppliedLoanUsers;
import loanapp.backend.Repo.AppliedUsersRepo;

@Service
public class AppliedUsersService {

    @Autowired
    private AppliedUsersRepo repository;

    public AppliedLoanUsers apply(UserAppliedDto dto) {
        // Validate required fields
        if (isNullOrEmpty(dto.getName()) ||
            isNullOrEmpty(dto.getEmail()) ||
            isNullOrEmpty(dto.getPhoneNumber()) ||
            isNullOrEmpty(dto.getAddress()) ||
            isNullOrEmpty(dto.getCity()) ||
            isNullOrEmpty(dto.getState()) ||
            isNullOrEmpty(dto.getLoanType()) ||
            dto.getAmount() <= 0 ||
            isNullOrEmpty(dto.getProperty())) {
            
            throw new IllegalArgumentException("All fields must be filled correctly.");
        }

        // Mapping DTO to Entity
        AppliedLoanUsers loan = new AppliedLoanUsers();
        loan.setName(dto.getName());
        loan.setEmail(dto.getEmail());
        loan.setPhoneNumber(dto.getPhoneNumber());
        loan.setAddress(dto.getAddress());
        loan.setCity(dto.getCity());
        loan.setState(dto.getState());
        loan.setLoanType(dto.getLoanType());
        loan.setAmount(dto.getAmount());
        loan.setProperty(dto.getProperty());
        loan.setStatus("Pending"); // Default status

        return repository.save(loan);
    }

    // Helper method to check for null or blank strings
    private boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
     public List<UserStatusDto> getAllUsersStatus() {
        return repository.findAll().stream()
                .map(loan -> new UserStatusDto(loan.getName(), loan.getEmail(), loan.getStatus()))
                .collect(Collectors.toList());
    }
}
