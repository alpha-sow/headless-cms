package dev.alphasow.headless_cms.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Getter
@Table("users")
class UserModel {
    @Id
    String username;
    String password;
    boolean enabled;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
