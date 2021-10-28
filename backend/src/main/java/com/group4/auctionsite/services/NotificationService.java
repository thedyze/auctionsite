package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.Notification;
import com.group4.auctionsite.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NotificationService {
    @Autowired
    NotificationRepository notificationRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

}
