package ordermanagement.com.example.mahaprabhu_sweet_center.repo;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.MyOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderRepo extends JpaRepository<MyOrder, Long> {

}
