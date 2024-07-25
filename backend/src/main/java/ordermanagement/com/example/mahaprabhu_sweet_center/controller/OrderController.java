package ordermanagement.com.example.mahaprabhu_sweet_center.controller;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.MyOrder;
import ordermanagement.com.example.mahaprabhu_sweet_center.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(produces ="application/json")
public class OrderController {
    @Autowired
    private OrderService ordServ;

    @GetMapping("get-order/{id}")
    public MyOrder getOrderById(@PathVariable Long id){
        return ordServ.getOrderById(id);
    }

    @GetMapping("/get-all-orders")
    public List<MyOrder> getAllOrders(){
        return ordServ.getAllOrders();
    }

    @PostMapping("/new-order")
    public MyOrder insertOrder(@RequestBody MyOrder ord){
        return ordServ.saveOrUpdate(ord);
    }
}
