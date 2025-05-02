package loanapp.backend.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import loanapp.backend.Dtos.UserAppliedDto;
import loanapp.backend.Dtos.UserStatusDto;
import loanapp.backend.Entity.AppliedLoanUsers;
import loanapp.backend.Entity.UserEntity;
import loanapp.backend.Repo.AppliedUsersRepo;
import loanapp.backend.Repo.UserRepository;

@Service
public class AppliedUsersService {

    @Autowired
    private AppliedUsersRepo repository;
    @Autowired
    private UserRepository userRepository; // Assuming you have a UserRepository to fetch UserEntity

    // @Autowired
    // private UserRepository userRepository; // Assuming you have a UserRepository to fetch UserEntity

  public AppliedLoanUsers apply(UserAppliedDto dto) {
    if (isNullOrEmpty(dto.getName()) ||
        isNullOrEmpty(dto.getEmail()) ||
        isNullOrEmpty(dto.getPhoneNumber()) ||
        isNullOrEmpty(dto.getAddress()) ||
        isNullOrEmpty(dto.getCity()) ||
        isNullOrEmpty(dto.getState()) ||
        isNullOrEmpty(dto.getLoanType()) ||
        dto.getAmount() <= 0 ||
        isNullOrEmpty(dto.getProperty()) ||
        dto.getUserId() <= 0) { // Check userId also
        throw new IllegalArgumentException("All fields must be filled correctly");
    }

    // // Fetch the UserEntity from DB
    // UserEntity user = userRepository.findById(dto.getId())
    //                    .orElseThrow(() -> new RuntimeException("User not found"));

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
    loan.setStatus("Pending");
    loan.setUserId(dto.getUserId()); // Set the userId from the DTO
    //System.out.println("User ID: " + dto.getUserId());
    
    // Now set the user
    

    return repository.save(loan);
}
    // Helper method to check for null or blank strings
    private boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
     public List<UserStatusDto> getAllUsersStatus() {
        return repository.findAll().stream()
                .map(loan -> new UserStatusDto(loan.getId(),loan.getName(), loan.getEmail(), loan.getStatus()))
                .collect(Collectors.toList());
    }
    public boolean updateStatus(Long id, String newStatus) {
        Optional<AppliedLoanUsers> optional = repository.findById(id);
        if (optional.isPresent()) {
            AppliedLoanUsers application = optional.get();
            application.setStatus(newStatus);
            repository.save(application);
            return true;
        } else {
            return false;
        }
    }

public List<UserStatusDto> getUsersById(Long id) {
    List<AppliedLoanUsers> applications = repository.findAllByUserId(id);
    
    List<UserStatusDto> dtos = new ArrayList<>();
    for (AppliedLoanUsers app : applications) {
        dtos.add(new UserStatusDto(app.getId(), app.getName(), app.getEmail(), app.getStatus()));
    }
    
    return dtos;
}
public List<UserAppliedDto> getLoanDetails(Long id) {
    List<AppliedLoanUsers> repositoryList=repository.findAllByUserId(id);
   List<UserAppliedDto> loanUser=new ArrayList<>();
   System.out.println("Loan User List: "+repositoryList);

   
   for(AppliedLoanUsers app:repositoryList){
    loanUser.add(new UserAppliedDto(app.getName(),app.getAmount(),app.getStatus()));
    

   }
   return loanUser;

    
}

public Long getAllLoanAmount() {
    Long totalAmout=repository.findAll().stream()
            .mapToLong(AppliedLoanUsers::getAmount)
            .sum();
    System.out.println("Total Amount: "+totalAmout);
    return totalAmout;
}

public List<String> getUniqueLoanUsers() {
    List<AppliedLoanUsers> allUsers=repository.findAll();

    List<String>  totalUsers=new ArrayList<>();
    for (AppliedLoanUsers user : allUsers) {
        totalUsers.add(user.getName());
    }
    return totalUsers;
}


}
