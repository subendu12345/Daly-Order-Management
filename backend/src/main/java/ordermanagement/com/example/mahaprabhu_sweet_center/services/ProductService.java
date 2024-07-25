package ordermanagement.com.example.mahaprabhu_sweet_center.services;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.Product;
import ordermanagement.com.example.mahaprabhu_sweet_center.repo.IProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private IProductRepo productRepo;

    public Product getProductById(Long prodId){
        return productRepo.findById(prodId).get();
    }

    public Product saveOrUpdate(Product prod){
        try{
            prod = productRepo.save(prod);
        }catch (Exception ex){

        }
        return prod;
    }

    public List<Product> getAllProducts(){
        return productRepo.findAll();
    }

    public List<Product> searchProductsByName(String productname){
        return productRepo.findByproductnameContainingIgnoreCase(productname);
    }


}
