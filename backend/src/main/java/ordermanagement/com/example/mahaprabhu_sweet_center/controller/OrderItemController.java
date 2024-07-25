package ordermanagement.com.example.mahaprabhu_sweet_center.controller;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.DTO.OrderItemDTO;
import ordermanagement.com.example.mahaprabhu_sweet_center.model.MyOrder;
import ordermanagement.com.example.mahaprabhu_sweet_center.model.OrderItem;
import ordermanagement.com.example.mahaprabhu_sweet_center.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(produces = "application/json")
public class OrderItemController {
    @Autowired
    private OrderItemService ordItemServ;

    @GetMapping("/get-item/{id}")
    public OrderItem getOrderItemById(@PathVariable Long id){
        return ordItemServ.getOrderById(id);
    }

    @GetMapping("get-products/{orderid}")
    public List<OrderItemDTO> getOrderItemsByOrderId(@PathVariable Long orderid){
        System.out.println(" ia am get-products "+ orderid);
        return ordItemServ.getOrderItemsByOrderId(orderid);
    }

    @PostMapping("/insert-products/{id}/items")
    public List<OrderItem> insertOrderItems(@PathVariable Long id, @RequestBody List<OrderItem> items){
        return ordItemServ.insertOrderOrderItems(id, items);
    }

    @Transactional
    @PutMapping("/update-orderitem/{orderid}/items")
    public List<OrderItem> updateOrderItems(@PathVariable Long orderid, @RequestBody List<OrderItem> orderItems){
        System.out.println("Udate is callling   "+ orderid);
        return ordItemServ.updateOrderItem(orderid, orderItems);
    }

    @Transactional
    @DeleteMapping("/delete/order-item/{id}")
    public String deleteOrderItemById(@PathVariable Long id){
       return ordItemServ.deleteOrderItemById(id);
    }
}
