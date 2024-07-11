package org.orderservice.service;


import com.example.orderservice.client.NotificationClient;
import com.example.orderservice.client.ProductClient;
import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductClient productClient;

    @Autowired
    private NotificationClient notificationClient;

    public Order createOrder(Order order) {
        Order savedOrder = orderRepository.save(order);
        productClient.getProductById(order.getProductId());
        notificationClient.sendNotification("New order created for product ID: " + order.getProductId());
        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrder(Long id, Order orderDetails) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setProductId(orderDetails.getProductId());
        order.setQuantity(orderDetails.getQuantity());
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
