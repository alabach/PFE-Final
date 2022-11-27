package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.User;

import java.util.List;

public interface UserService {
    //Post-Method
    User addUser(User user);
    //Get-Method
    List<User> getAllUser();
    User getUserById(Long id);
    //Put-Method
    User editUser(User user);
    //Delete-Method
    void deleteUser(Long id);
}
