package ordermanagement.com.example.mahaprabhu_sweet_center.model;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;
import java.util.List;

@Entity
@Table(name = "MyOrder")
public class MyOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NonNull
    private long id;

    @Column
    private String orderdeliverdate;

    @Column
    private String totalamount;

    @Column
    private String advanceamount;

    @Column
    private boolean isorderdeliverd;

    @OneToMany(mappedBy = "myOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrderdeliverdate() {
        return orderdeliverdate;
    }

    public void setOrderdeliverdate(String orderdeliverdate) {
        this.orderdeliverdate = orderdeliverdate;
    }

    public String getTotalamount() {
        return totalamount;
    }

    public void setTotalamount(String totalamount) {
        this.totalamount = totalamount;
    }

    public String getAdvanceamount() {
        return advanceamount;
    }

    public void setAdvanceamount(String advanceamount) {
        this.advanceamount = advanceamount;
    }

    public boolean getIsorderdeliverd() {
        return isorderdeliverd;
    }

    public void setIsorderdeliverd(boolean isorderdeliverd) {
        this.isorderdeliverd = isorderdeliverd;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", orderdeliverdate='" + orderdeliverdate + '\'' +
                ", totalamount='" + totalamount + '\'' +
                ", advanceamount='" + advanceamount + '\'' +
                ", isorderdeliverd=" + isorderdeliverd +
                '}';
    }
}
