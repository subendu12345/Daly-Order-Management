package ordermanagement.com.example.mahaprabhu_sweet_center.model;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;

@Entity
@Table(name = "Product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NonNull
    private long id;

    @Column
    private String productname;

    @Column
    private boolean isavailability;

    @Column
    private String price;

    @Column
    private String test;

    @Column
    private boolean issugarfree;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public boolean getIsavailability() {
        return isavailability;
    }

    public void setIsavailability(boolean isavailability) {
        this.isavailability = isavailability;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public boolean getIssugarfree() {
        return issugarfree;
    }

    public void setIssugarfree(boolean issugarfree) {
        this.issugarfree = issugarfree;
    }
}
