package com.personalproject1.AssignementSubmissionApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.personalproject1.AssignementSubmissionApp.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByUsername(String username);

}
