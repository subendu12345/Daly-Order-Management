package ordermanagement.com.example.mahaprabhu_sweet_center.repo;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
