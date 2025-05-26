package dev.alphasow.headless_cms.authentication;

import dev.alphasow.headless_cms.user.UserDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Authentication")
@AllArgsConstructor
@RequestMapping("api")
public class AuthenticationController {
    
    private final AuthenticationService authService;
    
    @PostMapping("/credential")
    public AuthenticationCredential credential(Authentication authentication){
        String token = authService.generateToken(authentication);
        return new AuthenticationCredential(token, "Bearer");
    }

    @GetMapping("/authentication")
    UserDTO auth(Authentication authentication){
        return authService.authenticate(authentication);
    }
}
