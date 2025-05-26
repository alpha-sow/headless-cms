package dev.alphasow.headless_cms.user;

import dev.alphasow.headless_cms.model.ErrorException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice(assignableTypes = UserController.class)
public class UserControllerAdvice {
    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<ErrorException> handleUserAlreadyExistException(UserAlreadyExistException e){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorException(e.getMessage(), HttpStatus.CONFLICT.value()));
    }
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorException> handleUserNotFoundException(UserNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorException(e.getMessage(), HttpStatus.NOT_FOUND.value()));
    }
}