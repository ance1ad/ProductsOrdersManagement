package org.notificationservice.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    @PostMapping("/send")
    public String sendNotification(@RequestBody String message) {
        // Здесь может быть интеграция с внешним сервисом для отправки уведомлений
        return "Notification sent: " + message;
    }
}