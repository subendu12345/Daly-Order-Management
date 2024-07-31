package ordermanagement.com.example.mahaprabhu_sweet_center.repo;


import ordermanagement.com.example.mahaprabhu_sweet_center.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProfileRepo extends JpaRepository<Profile, Long> {
}
