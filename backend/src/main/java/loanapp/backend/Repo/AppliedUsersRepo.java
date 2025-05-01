package loanapp.backend.Repo;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import loanapp.backend.Entity.AppliedLoanUsers;


public interface AppliedUsersRepo extends JpaRepository<AppliedLoanUsers, Long> {

    List<AppliedLoanUsers> findAllByUserId(Long id); // not Optional, use List
}
