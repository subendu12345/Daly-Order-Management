package ordermanagement.com.example.mahaprabhu_sweet_center.model.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OrderItemDTO {
    @JsonProperty("itemName")
    private String itemName;

    @JsonProperty("quantity")
    private String quantity;

    @JsonProperty("perPrice")
    private String perPrice;

    @JsonProperty("id")
    private Long id;


    public OrderItemDTO(Long id, String itemName, String quantity, String perPrice){
        this.itemName = itemName;
        this.quantity = quantity;
        this.perPrice = perPrice;
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getPerPrice() {
        return perPrice;
    }

    public void setPerPrice(String perPrice) {
        this.perPrice = perPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
