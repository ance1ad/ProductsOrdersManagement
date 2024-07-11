package org.orderservice.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service", url = "http://localhost:8083")
public class NotificationClient {
    @PostMapping("/notifications/send")
    String sendNotification(@RequestBody String message);
}
