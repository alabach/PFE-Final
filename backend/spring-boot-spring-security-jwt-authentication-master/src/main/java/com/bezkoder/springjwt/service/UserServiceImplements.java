package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;



@RequiredArgsConstructor
@Service
public class UserServiceImplements implements UserService {

    private static final Logger logger = LogManager.getLogger(UserServiceImplements.class);

    private final UserRepository userRepository;

    private final PasswordEncoder encoder;


    @Override
    public User addUser(User user) {
        logger.info("In Add User Service");
        try {

            user.setPassword(encoder.encode(user.getPassword()));

            return userRepository.save(user);
        } catch (Exception e) {
            String message = "Error In Adding User " + e.getMessage();
            logger.error(message);
            throw e;
        }
    }

    @Override
    public List<User> getAllUser() {
        logger.info("In Getting All User Service");
        try {
            List<User> userList = new ArrayList<>();
            userRepository.findAll(Sort.by("creationDate").descending()).forEach(userList::add);
            return userList;
        } catch (Exception e) {
            String message = "Error In Getting All User Service " + e.getMessage();
            logger.error(message);
            throw e;
        }
    }

    @Override
    public User getUserById(Long id) {
        logger.info("In Getting  User By Id Service");
        try {
            return userRepository.findById(id).orElseThrow();
        } catch (Exception e) {
            String message = "Error In Getting  User By Id Service " + e.getMessage();
            logger.error(message);
            throw e;
        }
    }

    @Override
    public User editUser(User user) {
        logger.info("In Updating  User By Id Service");
        try {
            user.setPassword(encoder.encode(user.getPassword()));
            user.setRoles(user.getRoles());
            return userRepository.save(user);
        } catch (Exception e) {
            String message ="Error In Updating  User By Id Service " + e.getMessage();
            logger.error(message);
            throw e;
        }
    }

    @Override
    public void deleteUser(Long id) {
        logger.info("In Delete User By Id Service");
        try {
            userRepository.deleteById(id);
        } catch (Exception e) {
            String message ="Error Delete User By Id Service" + e.getMessage();
            logger.error(message);
            throw e;
        }
    }
}
