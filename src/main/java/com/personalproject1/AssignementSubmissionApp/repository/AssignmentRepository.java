package com.personalproject1.AssignementSubmissionApp.repository;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.personalproject1.AssignementSubmissionApp.domain.Assignment;
import com.personalproject1.AssignementSubmissionApp.domain.User;


public interface AssignmentRepository extends JpaRepository<Assignment,Long> {
	
	Set<Assignment>findByUser(User user);
	
	@Query("select a from Assignment a " +
		       "where a.status = 'submitted' " +
		       "or a.codeReviewer = :codeReviewer")
		Set<Assignment> findByCodeReviewer(User codeReviewer);


}
