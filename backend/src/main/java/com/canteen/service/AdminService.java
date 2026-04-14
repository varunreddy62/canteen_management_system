package com.canteen.service;

import com.canteen.model.Admin;
import com.canteen.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public boolean authenticate(String username, String password) {
        Optional<Admin> admin = adminRepository.findByUsername(username);
        return admin.isPresent() && admin.get().getPassword().equals(password);
    }
}
