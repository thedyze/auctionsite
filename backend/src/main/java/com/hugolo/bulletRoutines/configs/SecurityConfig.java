package com.hugolo.bulletRoutines.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers(HttpMethod.GET, "/", "/rest/**").permitAll()
        .antMatchers(HttpMethod.POST, "/login").permitAll()     // doesn't require login
        .antMatchers("/auth/**").permitAll()     // doesn't require login
        .antMatchers("/rest/**").permitAll() // user is logged in
        //.antMatchers("/buying").authenticated() // user is logged in
    ;
  }
}