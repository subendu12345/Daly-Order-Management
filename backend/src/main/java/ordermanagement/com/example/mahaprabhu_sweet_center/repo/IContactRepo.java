package ordermanagement.com.example.mahaprabhu_sweet_center.repo;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IContactRepo extends JpaRepository<Contact, Long> {
}
