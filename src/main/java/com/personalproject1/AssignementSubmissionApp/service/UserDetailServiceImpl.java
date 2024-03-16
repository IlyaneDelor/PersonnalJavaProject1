package com.personalproject1.AssignementSubmissionApp.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.personalproject1.AssignementSubmissionApp.domain.User;
import com.personalproject1.AssignementSubmissionApp.repository.UserRepository;
import com.personalproject1.AssignementSubmissionApp.util.CustomPasswordEncoder;

@Service
public class UserDetailServiceImpl implements UserDetailsService{

	@Autowired
	private CustomPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepo;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> userOpt = userRepo.findByUsername(username);
		
		
		return userOpt.orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
		/*
		User user = new User();
		user.setUsername(username);
		user.setPassword(passwordEncoder.getPasswordEncoder().encode("azerazer"));
		user.setId(1L);
		return user;*/
	
	}
}
