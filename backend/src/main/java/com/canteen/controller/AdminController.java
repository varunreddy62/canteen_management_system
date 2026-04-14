package com.canteen.controller;

import com.canteen.dto.LoginRequest;
import com.canteen.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean authenticated = adminService.authenticate(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );

        if (authenticated) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Login successful"
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Invalid username or password"
            ));
        }
    }
}
