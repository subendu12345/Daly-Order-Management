package ordermanagement.com.example.mahaprabhu_sweet_center.services;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.Contact;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    @Autowired
    private IContactRepo conRepo;

    public Contact getContactById(Long conId){
        return conRepo.findById(conId).get();
    }

    public Contact saveOrUpdate(Contact con){
        try{
            con = conRepo.save(con);
        }catch (Exception ex){

        }

        return con;
    }
}
