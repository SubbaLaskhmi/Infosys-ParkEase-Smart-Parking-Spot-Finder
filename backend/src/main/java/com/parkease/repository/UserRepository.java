package com.parkease.repository;

import com.parkease.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    Optional<User> findByGoogleId(String googleId);

    boolean existsByEmail(String email);

    Optional<User> findByResetPasswordToken(String token);
}
