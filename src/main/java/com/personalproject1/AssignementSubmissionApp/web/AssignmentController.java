package com.personalproject1.AssignementSubmissionApp.web;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalproject1.AssignementSubmissionApp.domain.Assignment;
import com.personalproject1.AssignementSubmissionApp.domain.User;
import com.personalproject1.AssignementSubmissionApp.dto.AssignmentResponseDto;
import com.personalproject1.AssignementSubmissionApp.enums.AuthorityEnum;
import com.personalproject1.AssignementSubmissionApp.service.AssignmentService;
import com.personalproject1.AssignementSubmissionApp.service.UserService;
import com.personalproject1.AssignementSubmissionApp.util.AuthorityUtil;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
	
	@Autowired
	private AssignmentService assignmentService;
	@Autowired
	private UserService userService;
	
	
	@PostMapping("")
	public ResponseEntity<?> createAssignment (@AuthenticationPrincipal User user) {
		Assignment newAssignment = assignmentService.save(user);
		return ResponseEntity.ok(newAssignment);
	}
	
	@GetMapping("")
	public ResponseEntity<?> getAssignment (@AuthenticationPrincipal User user) { 
	Set<Assignment> assignmentsByUser = assignmentService.findByUser(user);
	return ResponseEntity.ok(assignmentsByUser);
		
		}
	
	@GetMapping("{assignmentId}")
	public ResponseEntity<?> getAssignment (@PathVariable Long assignmentId, @AuthenticationPrincipal User user) { 
		Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
		
		AssignmentResponseDto response = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
		
		return ResponseEntity.ok(response);
		
		}
	
	@PutMapping("{assignmentId}")
	public ResponseEntity<?> updateAssignment (@PathVariable Long assignmentId, 
			@RequestBody Assignment assignment,
			@AuthenticationPrincipal User user) { 
		
			if(assignment.getCodeReviewer() != null) {
				User codeReviewer = assignment.getCodeReviewer();
				codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());
				
				if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)) {
					assignment.setCodeReviewer(codeReviewer);
				}
			}
		
			Assignment updateAssignment = assignmentService.save(assignment);
			return ResponseEntity.ok(updateAssignment);
		
		}
	
	
	
}
