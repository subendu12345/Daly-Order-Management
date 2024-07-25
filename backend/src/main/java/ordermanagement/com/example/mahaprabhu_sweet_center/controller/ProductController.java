package ordermanagement.com.example.mahaprabhu_sweet_center.controller;

import ordermanagement.com.example.mahaprabhu_sweet_center.model.Product;
import ordermanagement.com.example.mahaprabhu_sweet_center.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(produces = "application/json")
public class ProductController {
    @Autowired
    private ProductService prodServ;

    @GetMapping("/get-product/{id}")
    public Product getProductById(@PathVariable Long id){
        return prodServ.getProductById(id);
    }


    @GetMapping("/get-all-products")
    public List<Product> getAllProducts(){
        return prodServ.getAllProducts();
    }

    @GetMapping("/search/{productname}")
    public List<Product> searchProductByName(@PathVariable String productname){
        return prodServ.searchProductsByName(productname);
    }

    @PostMapping("/new-product")
    public Product createProduct(@RequestBody Product product){
        return prodServ.saveOrUpdate(product);
    }
}
