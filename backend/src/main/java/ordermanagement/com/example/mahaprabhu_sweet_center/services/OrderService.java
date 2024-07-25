package ordermanagement.com.example.mahaprabhu_sweet_center.services;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.MyOrder;
import ordermanagement.com.example.mahaprabhu_sweet_center.model.OrderItem;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private IOrderRepo orderRepo;

    public MyOrder getOrderById(Long orderId){
        return orderRepo.findById(orderId).get();
    }

    public MyOrder saveOrUpdate(MyOrder order){
        try {
            order =  orderRepo.save(order);
        }catch (Exception ex){
            System.out.println("Order Exception "+ ex);
        }
        return order;
    }

    public List<MyOrder> getAllOrders(){
        return orderRepo.findAll();
    }

}
