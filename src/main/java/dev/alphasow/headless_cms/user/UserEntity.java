package dev.alphasow.headless_cms.user;

import dev.alphasow.headless_cms.authority.AuthorityEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name ="users")
public class UserEntity {
    @Id
    String username;
    String password;
    boolean enabled;
    String avatar;
    String phone;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    @OneToMany(mappedBy = "user")
    Set<AuthorityEntity> authorities;
}
