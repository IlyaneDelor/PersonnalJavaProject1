package com.personalproject1.AssignementSubmissionApp.config;


import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.personalproject1.AssignementSubmissionApp.filter.JwtFilter;
import com.personalproject1.AssignementSubmissionApp.util.CustomPasswordEncoder;




@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private CustomPasswordEncoder customPasswordEncoder;

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(customPasswordEncoder.getPasswordEncoder());
		// Your authentication configuration goes here
    }
    @Autowired
    private JwtFilter jwtFilter;
    
    @Bean @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
    	return super.authenticationManagerBean();
    	
    }
    
    protected void configure(HttpSecurity http) throws Exception {
    	// TODO Auto-generated method stub
    	http = http.csrf().disable().cors().disable();
        
        http = http.sessionManagement()
        		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        	    .and();
        
        http = http.exceptionHandling()
        		.authenticationEntryPoint((request, response, ex) -> {
        			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
        		}).and();
        
        http.authorizeRequests()
        		.antMatchers("/api/auth/**").permitAll()
        		.anyRequest().authenticated();
        		
        		
        
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        
;
        }
    
    
    

    
    
}
