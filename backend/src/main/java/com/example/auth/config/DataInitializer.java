package com.example.auth.config;

import com.example.auth.dto.RegisterRequest;
import com.example.auth.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Data initializer to create example users on startup.
 */
@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner commandLineRunner(AuthenticationService service) {
        return args -> {
            try {
                var admin = RegisterRequest.builder()
                        .name("Admin User")
                        .email("admin@example.com")
                        .password("password")
                        .build();
                System.out.println("Admin token: " + service.register(admin).getToken());

                var user = RegisterRequest.builder()
                        .name("Regular User")
                        .email("user@example.com")
                        .password("password")
                        .build();
                System.out.println("User token: " + service.register(user).getToken());
            } catch (Exception e) {
                System.out.println("Users already exist or error during initialization: " + e.getMessage());
            }
        };
    }
}
