package dev.alphasow.headless_cms.user;

import dev.alphasow.headless_cms.model.PageResponse;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

    final UserRepository userRepository;
    final PasswordEncoder encoder;
    final JdbcUserDetailsManager jdbcUserDetailsManager;
    final UserMapper userMapper;

    PageResponse<UserDTO> findAll(Pageable pageable) {
        return new PageResponse<>(userMapper.pageUserModelToPageUserDto(userRepository.findAll(pageable)));
    }

    public Optional<UserDTO> createUser(@NotNull UserDTO user) {
        final UserDetails newUser = User.builder()
                .username(user.getUsername())
                .password(encoder.encode(user.getPassword()))
                .roles("GUEST")
                .build();
        if (jdbcUserDetailsManager.userExists(newUser.getUsername())) {
            throw new UserAlreadyExistException("User already exists");
        }
        jdbcUserDetailsManager.createUser(newUser);
        final UserEntity response = userRepository.findById(newUser.getUsername()).orElseThrow(
                UserNotFoundException::new
        );
        return Optional.ofNullable(userMapper.userDataToUserDto(response));
    }
    
    public Optional<UserDTO> findById(String id){
        final UserEntity user = userRepository.findById(id).orElseThrow(
                UserNotFoundException::new
        );
        return Optional.ofNullable(userMapper.userDataToUserDto(user));
    }

    public void deleteUser(String username) {
        jdbcUserDetailsManager.deleteUser(username);
    }

    public UserDTO updatePhone(String username, UserPhoneDTO phone) {
        final UserEntity user = userRepository.findById(username).orElseThrow(
                UserNotFoundException::new
        );
        user.setPhone(phone.getPhone());
        userRepository.save(user);
        return userMapper.userDataToUserDto(user);
    }

    public UserDTO updateEnable(String username, UserEnabledDTO enable) {
        final UserEntity user = userRepository.findById(username).orElseThrow(
                UserNotFoundException::new
        );
        user.setEnabled(enable.isEnabled());
        userRepository.save(user);
        return userMapper.userDataToUserDto(user);
    }
    
    public UserDTO updateAvatar(String username, String avatar){
        final UserEntity user = userRepository.findById(username).orElseThrow(
                UserNotFoundException::new
        );
        user.setAvatar(avatar);
        userRepository.save(user);
        return userMapper.userDataToUserDto(user);
    }
}   
