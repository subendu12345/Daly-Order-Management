package ordermanagement.com.example.mahaprabhu_sweet_center.controller;
import ordermanagement.com.example.mahaprabhu_sweet_center.model.User;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IUserRepo;
import ordermanagement.com.example.mahaprabhu_sweet_center.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(produces = "application/json")
public class UserController {
    @Autowired
    private IUserRepo userRepo;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public boolean doLogin(@RequestBody User user){
       return userService.doLogin(user.getUsername(), user.getPassword());
    }

    @PostMapping("/signup")
    public String doSignup(@RequestBody User user){
        return userService.doSignup(user);
    }


    @GetMapping("/get-user/{username}")
    public User getUserByUserName(@PathVariable String username){
        System.out.println("get-user call "+ username);
        return userService.getUserByUserName(username);
    }
}
