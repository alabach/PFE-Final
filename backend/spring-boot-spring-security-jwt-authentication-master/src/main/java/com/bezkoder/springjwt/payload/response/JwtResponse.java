package com.bezkoder.springjwt.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class JwtResponse {
  private String jwt;
  private final String type = "Bearer";
  private Long id;
  private String username;
  private String email;
  private String firstname;
  private String lastname;
  private String phone;
  private List<String> roles;}

