package loanapp.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import loanapp.backend.Entity.AppliedLoanUsers;


public interface AppliedUsersRepo extends JpaRepository<AppliedLoanUsers, Long> {
}
