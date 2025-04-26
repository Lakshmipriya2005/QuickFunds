package loanapp.backend.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RestController;

import loanapp.backend.Dtos.UserDto;

import loanapp.backend.Service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;




@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        String rsponse=userService.register(userDto);
        System.out.println(rsponse);
        return ResponseEntity.ok(rsponse);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto, HttpServletRequest request) {
        
            ResponseEntity<String> response = userService.authenticate(userDto.getUsername(), userDto.getPassword());
            System.out.println(response.getStatusCode());
    
            if(response.getStatusCode().value()==200){
                System.out.print("Success");
                return ResponseEntity.ok("Logged In Successfully");
            } else {
                return ResponseEntity.status(401).body("Wrong Credentials");
            }
    }
  
}
