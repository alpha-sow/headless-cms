package dev.alphasow.headless_cms.user;

import dev.alphasow.headless_cms.dto.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    final UserRepository userRepository;
    final PasswordEncoder encoder;
    final JdbcUserDetailsManager jdbcUserDetailsManager;

    PageResponse<UserModel> findAll(Pageable pageable) {
        return new PageResponse<>(userRepository.findAll(pageable));
    }

    public void createUser(UserModel user) {
        final UserDetails newUser = User.builder()
                .username(user.getUsername())
                .password(encoder.encode(user.getPassword()))
                .build();
        if (jdbcUserDetailsManager.userExists(newUser.getUsername())) {
            throw new IllegalArgumentException("User already exists");
        }
        jdbcUserDetailsManager.createUser(newUser);
    }

    public void deleteUser(String username) {
        jdbcUserDetailsManager.deleteUser(username);
    }
}
