package dev.alphasow.headless_cms.user;

import dev.alphasow.headless_cms.authentication.IsAdmin;
import dev.alphasow.headless_cms.service.UploadFileService;
import dev.alphasow.headless_cms.model.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@Tag(name = "Users")
public class UserController {


    final UserService userService;
    final UploadFileService uploadFileService;

    @Value("${app.HOST_URL}")
    private String hostUrl;
    
    @IsAdmin
    @GetMapping
    public PageResponse<UserDTO> findAllUsers(Pageable pageable) {
        return userService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Optional<UserDTO> findById(@PathVariable String id) {
        return userService.findById(id);
    }

    @IsAdmin
    @PostMapping
    public ResponseEntity<Optional<UserDTO>> createUser(@RequestBody UserDTO user) {
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
    }

    @IsAdmin
    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{username}/phone")
    public ResponseEntity<UserDTO> updatePhone(@PathVariable String username, @RequestBody UserPhoneDTO phoneDto){
        UserDTO updatedUser = userService.updatePhone(username, phoneDto);
        return ResponseEntity.ok().body(updatedUser);
    }
    
    @IsAdmin
    @PatchMapping("/{username}/enabled")
    public ResponseEntity<UserDTO> updateEnable(@PathVariable String username, @RequestBody UserEnabledDTO enabledDto){
        UserDTO updatedUser = userService.updateEnable(username, enabledDto);
        return ResponseEntity.ok().body(updatedUser);
    }

    @PatchMapping("/{username}/avatar")
    public ResponseEntity<UserDTO> updateUserAvatar(
            @PathVariable String username, 
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        final String fileName = uploadFileService.uploadFile("avatars", username, file);
        final String avatarUrl = hostUrl +"/avatars/" + fileName;
        final UserDTO user =  userService.updateAvatar(username, avatarUrl);
        return ResponseEntity.ok().body(user);
    }
}