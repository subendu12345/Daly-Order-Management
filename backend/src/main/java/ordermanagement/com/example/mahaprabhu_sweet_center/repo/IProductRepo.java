package ordermanagement.com.example.mahaprabhu_sweet_center.repo;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface IProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByproductnameContainingIgnoreCase(String productname);
}
