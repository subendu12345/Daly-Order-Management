package ordermanagement.com.example.mahaprabhu_sweet_center.services;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.DTO.OrderItemDTO;
import ordermanagement.com.example.mahaprabhu_sweet_center.model.MyOrder;
import ordermanagement.com.example.mahaprabhu_sweet_center.model.OrderItem;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IOrderItemRepo;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class OrderItemService {
    @Autowired
    private IOrderItemRepo orderItem;
    @Autowired
    private IOrderRepo myOrderRepo;

    public OrderItem getOrderById(Long oid){
        return orderItem.findById(oid).get();
    }

    public OrderItem saveOrUpdate(OrderItem oItem){
        try{
            oItem  = orderItem.save(oItem);
        }catch (Exception ex){

        }

        return oItem;
    }

    public List<OrderItem> insertOrderOrderItems(Long orderId, List<OrderItem> orderItems){
        MyOrder order = myOrderRepo.findById(orderId).orElseThrow(()-> new RuntimeException("Order not found"));
        for (OrderItem oi : orderItems){
            oi.setMyOrder(order);
            System.out.println("inert item calll "+oi.toString());
        }
        orderItem.saveAll(orderItems);
        return orderItems;
    }

    @Transactional
    public List<OrderItem> updateOrderItem(Long orderId, List<OrderItem> orderItems){
        System.out.println("*********************************************************************************************");
        MyOrder order = myOrderRepo.findById(orderId).orElseThrow(()-> new RuntimeException("Order not found"));
        for (OrderItem oi : orderItems) {
           oi.setMyOrder(order);
        }
        orderItem.saveAll(orderItems);
        return orderItems;
    }

    public List<OrderItemDTO> getOrderItemsByOrderId(Long orderid){
        System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6 "+ orderid);
        return handleQueryResult(orderItem.findOrderItemByOrderId(orderid));
    }

    private List<OrderItemDTO> handleQueryResult(List<OrderItem> orderItems){
        List<OrderItemDTO> ordItemsDto = new ArrayList<>();
        for (OrderItem oi : orderItems){
            ordItemsDto.add(
                    new OrderItemDTO(oi.getId() ,oi.getItemname(), oi.getQuantity(), oi.getRupeesperitem())
            );
        }

        System.out.println("ordItemsDto "+ ordItemsDto.size());
        return ordItemsDto;
    }

    //This method help to delete orderItem by id
    public String deleteOrderItemById(Long id){
        String message="success";
        try{
            orderItem.deleteById(id);
        }catch (Exception ex){
            message = ex.getMessage();
        }
        return message;
    }
}
