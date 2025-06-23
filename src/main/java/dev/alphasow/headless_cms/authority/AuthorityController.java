package dev.alphasow.headless_cms.authority;

import dev.alphasow.headless_cms.authentication.IsAdmin;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/authority")
@AllArgsConstructor
@Tag(name = "Authority")
public class AuthorityController {
    
    final AuthorityService authorityService;
    
    @IsAdmin
    @GetMapping("/{username}")
    public AuthorityDTO getUserAuthority(@PathVariable String username){
        return authorityService.getUsersAuthority(username);
    }
    
    @IsAdmin
    @PatchMapping
    public AuthorityDTO updateUserAuthority(@RequestParam String username, @RequestParam AuthorityEnum role){
        return authorityService.updateUserAuthority(new AuthorityDTO(username, role));
    }
}
