package org.orderservice.client;



import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service", url = "http://localhost:8081")
public class ProductClient {
    @GetMapping("/products/{id}")
    String getProductById(@PathVariable Long id);
}
