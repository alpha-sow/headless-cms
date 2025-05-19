package dev.alphasow.headless_cms.user;

import dev.alphasow.headless_cms.dto.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@Tag(name = "Users")
public class UserController {

    final UserService userService;

    @GetMapping("/users")
    PageResponse<UserModel> createUser(Pageable pageable) {
        return userService.findAll(pageable);
    }
    
    @PostMapping("/users")
    String createUser(@RequestBody UserModel user) {
        userService.createUser(user);
       return "success";
    }
    
    @DeleteMapping("/users/{username}")
    String deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return "success";
    }
}
