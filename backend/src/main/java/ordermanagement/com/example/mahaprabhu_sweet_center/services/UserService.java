package ordermanagement.com.example.mahaprabhu_sweet_center.services;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.Profile;
import ordermanagement.com.example.mahaprabhu_sweet_center.model.User;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IProfileRepo;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private IUserRepo userRepo;

    @Autowired
    private IProfileRepo profileRepo;

    public String saveOrUpdateUser(Long profileId, User user){
        String message = "success";
        Profile profile = profileRepo.findById(profileId).orElseThrow(()-> new RuntimeException("Profile not found.."));
        user.setProfile(profile);
        try{
            userRepo.save(user);
        }catch (Exception ex){
            message = ex.getMessage();
        }

        return message;
    }

    public User getUserById(Long userId){
       return userRepo.findById(userId).orElseThrow(()-> new RuntimeException("User not found"));
    }

    public User getUserByUserName(String username){
        return userRepo.findByUsername(username);
    }

    public String doSignup(User user){
        String message = "success";
        User u = userRepo.findByUsername(user.getUsername());
        if(u !=null)return ("user name already exsit");
        try{
            userRepo.save(user);
        }catch (Exception ex){
            message = ex.getMessage();
        }
        return message;
    }

    public boolean doLogin(String userName, String password){
        User user = userRepo.findByUsername(userName);
        if(user.getUsername() == userName && password == user.getPassword()){
            return true;
        }
        return false;
    }

}
