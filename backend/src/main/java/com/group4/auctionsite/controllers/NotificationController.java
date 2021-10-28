package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.Notification;
import com.group4.auctionsite.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.AuctionItemDetails.AuctionItemDetailsService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/rest/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

}
