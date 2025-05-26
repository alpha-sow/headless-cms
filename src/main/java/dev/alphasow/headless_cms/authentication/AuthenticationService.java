package dev.alphasow.headless_cms.authentication;

import dev.alphasow.headless_cms.user.UserEntity;
import dev.alphasow.headless_cms.user.UserDTO;
import dev.alphasow.headless_cms.user.UserMapper;
import dev.alphasow.headless_cms.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthenticationService {
    
    private final JwtEncoder encoder;
    private final UserRepository userRepository;
    
    public String generateToken(Authentication authentication){
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
    
    public UserDTO authenticate(Authentication authentication){
        final UserEntity user = userRepository.findById(authentication.getName()).orElse(null);
        return UserMapper.instance.userDataToUserDto(user);
    }
}
