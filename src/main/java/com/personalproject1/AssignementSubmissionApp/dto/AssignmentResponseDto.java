package com.personalproject1.AssignementSubmissionApp.dto;

import com.personalproject1.AssignementSubmissionApp.domain.Assignment;
import com.personalproject1.AssignementSubmissionApp.enums.AssignmentEnum;

public class AssignmentResponseDto {
	
	private Assignment assignment;
	private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
	
	
	
	public AssignmentResponseDto(Assignment assignment) {
		super();
		this.assignment = assignment;
	} 
	
	
	public Assignment getAssignment() {
		return assignment;
	}
	public void setAssignment(Assignment assignment) {
		this.assignment = assignment;
	}


	public AssignmentEnum[] getAssignmentEnums() {
		return assignmentEnums;
	}


	public void setAssignmentEnums(AssignmentEnum[] assignmentEnums) {
		this.assignmentEnums = assignmentEnums;
	}




	
	
	

}
