package ordermanagement.com.example.mahaprabhu_sweet_center.model;

import jakarta.persistence.*;
import ordermanagement.com.example.mahaprabhu_sweet_center.EntityListeners.OrderItemListeners;
import org.springframework.lang.NonNull;

@Entity
@Table(name = "OrderItem")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NonNull
    private long id;

    @Column
    private String quantity;

    @Column
    private String itemname;

    @Column
    private String rupeesperitem;

    @Column
    private String itemsize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_order_id")
    private MyOrder myOrder;

    // Default constructor
    public OrderItem() {}

    //Copy constructor
    public OrderItem(OrderItem oi){
        this.id = oi.getId();
        this.itemsize = oi.getItemsize();
        this.quantity = oi.getQuantity();
        this.itemname = oi.getItemname();
        this.rupeesperitem = oi.getRupeesperitem();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getRupeesperitem() {
        return rupeesperitem;
    }

    public void setRupeesperitem(String rupeesperitem) {
        this.rupeesperitem = rupeesperitem;
    }

    public String getItemsize() {
        return itemsize;
    }

    public void setItemsize(String itemsize) {
        this.itemsize = itemsize;
    }

    public MyOrder getMyOrder() {
        return myOrder;
    }

    public void setMyOrder(MyOrder myOrder) {
        this.myOrder = myOrder;
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(String itemname) {
        this.itemname = itemname;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", quantity='" + quantity + '\'' +
                ", itemname='" + itemname + '\'' +
                ", rupeesperitem='" + rupeesperitem + '\'' +
                ", itemsize='" + itemsize + '\'' +
                ", myOrder=" + myOrder +
                '}';
    }
}
