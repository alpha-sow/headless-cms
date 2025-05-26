package dev.alphasow.headless_cms.authority;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.alphasow.headless_cms.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "authorities")
public class AuthorityEntity {
        @Id
        String username;
        String authority;
        @ManyToOne
        @JoinColumn(name = "username", referencedColumnName = "username", insertable = false, updatable = false)
        @JsonIgnore
        UserEntity user;
}
