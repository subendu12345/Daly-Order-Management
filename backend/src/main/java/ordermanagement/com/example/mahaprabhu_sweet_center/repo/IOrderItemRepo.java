package ordermanagement.com.example.mahaprabhu_sweet_center.repo;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface IOrderItemRepo extends JpaRepository<OrderItem, Long> {

    @Query("SELECT i FROM OrderItem i WHERE i.myOrder.id = :my_order_id ")
    List<OrderItem> findOrderItemByOrderId(@Param("my_order_id") Long my_order_id);

    @Query("SELECT i FROM OrderItem i WHERE i.myOrder.id IN :my_order_id")
    List<OrderItem> findOrderItemsByOrderIds(@Param("my_order_id")  Set<Long> my_order_id);
}
