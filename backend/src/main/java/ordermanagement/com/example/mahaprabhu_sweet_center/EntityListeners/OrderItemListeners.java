package ordermanagement.com.example.mahaprabhu_sweet_center.EntityListeners;

import jakarta.persistence.PostUpdate;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.PostLoad;
import jakarta.transaction.Transactional;
import ordermanagement.com.example.mahaprabhu_sweet_center.model.OrderItem;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IOrderItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class OrderItemListeners {
    private static IOrderItemRepo orderItemRepo;
    private static final Map<Long, OrderItem> oldOrderItemMap = new HashMap<>();
    private static boolean isRecurciveCall=false;

    @Autowired
    public void setOrderItemRepo(IOrderItemRepo orderItemRepo) {
        OrderItemListeners.orderItemRepo = orderItemRepo;
    }

    @PostLoad
    public void onPostLoad(OrderItem orderItem) {
        oldOrderItemMap.put(orderItem.getId(), new OrderItem(orderItem));
    }


    @PreUpdate
    public void onPreUpdate(OrderItem orderitem) {
        System.out.println("preUpdate calling......................"+ orderitem.toString());
        System.out.println("old value is "+ oldOrderItemMap.get(orderitem.getId()).toString());
        // Here you can store the old value of the field

    }
    @Transactional
    @PostUpdate
    public void handlePostUpdate(OrderItem orderitem){
        if(!isRecurciveCall){
            isRecurciveCall = true;
            System.out.println("post update calling....................."+ orderitem.toString());
            Set<Long> accIds = new HashSet<>();
            if((orderitem.getQuantity() != oldOrderItemMap.get(orderitem.getId()).getQuantity()) || orderitem.getRupeesperitem() != oldOrderItemMap.get(orderitem.getId()).getRupeesperitem() ){
                accIds.add(orderitem.getMyOrder().getId());
            }

            System.out.println("accIds "+ accIds);

            if(!accIds.isEmpty()){
                handleQuantityOrPriceChange(accIds);
            }
        }else{
            return;
        }

    }

    private void handleQuantityOrPriceChange(Set<Long> accIds){
        Map<Long, List<OrderItem>> orderIdToOrderItemMap=  new HashMap<>();
        List<OrderItem> orderItems= orderItemRepo.findOrderItemsByOrderIds(accIds);
        System.out.println("my OrderItemListeners calling-------------> "+ orderItems.size());
    }
}
