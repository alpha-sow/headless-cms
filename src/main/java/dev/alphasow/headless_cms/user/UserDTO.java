package dev.alphasow.headless_cms.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.alphasow.headless_cms.authority.AuthorityDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@Getter
@Setter
public class UserDTO { 
    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private boolean enabled;
    private String avatar;
    private String phone;
    private  Set<AuthorityDTO> authorities;
}
