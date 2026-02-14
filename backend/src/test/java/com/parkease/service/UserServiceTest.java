package com.parkease.service;

import com.parkease.model.User;
import com.parkease.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    public UserServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testWithdrawFunds_Success() {
        String userId = "user123";
        User user = new User();
        user.setId(userId);
        user.setWalletBalance(100.0);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        User updatedUser = userService.withdrawFunds(userId, 40.0);

        assertEquals(60.0, updatedUser.getWalletBalance());
        assertEquals(1, updatedUser.getTransactions().size());
        assertEquals("debit", updatedUser.getTransactions().get(0).getType());
        assertEquals(40.0, updatedUser.getTransactions().get(0).getAmount());
    }

    @Test
    void testWithdrawFunds_InsufficientBalance() {
        String userId = "user123";
        User user = new User();
        user.setId(userId);
        user.setWalletBalance(30.0);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        assertThrows(RuntimeException.class, () -> userService.withdrawFunds(userId, 50.0));
    }
}
