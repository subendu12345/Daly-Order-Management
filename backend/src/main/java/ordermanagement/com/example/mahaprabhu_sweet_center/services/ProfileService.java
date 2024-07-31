package ordermanagement.com.example.mahaprabhu_sweet_center.services;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.Profile;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    private IProfileRepo profileRepo;

    public Profile getProfileById(Long profileId){
        return profileRepo.findById(profileId).orElseThrow(()-> new RuntimeException("Profile not found"));
    }
}
