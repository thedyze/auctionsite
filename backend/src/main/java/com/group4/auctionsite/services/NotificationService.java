package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Bid;
import com.group4.auctionsite.entities.Notification;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import com.group4.auctionsite.repositories.BidRepository;
import com.group4.auctionsite.repositories.NotificationRepository;
import com.group4.auctionsite.springSocket.socket.SocketModule;
import com.group4.auctionsite.utils.FrontEndHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NotificationService {
    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    BidRepository bidRepository;
    @Autowired
    AuctionItemRepository auctionItemRepository;
    @Autowired
    SocketModule socketModule;
    FrontEndHelper frontEndHelper = new FrontEndHelper();

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public void createNotification(Notification notification) {
        notification = notificationRepository.save(notification);
        String title = auctionItemRepository.findById(notification.getItemId()).get().getTitle();
        socketModule.emit2("notification", notification, title);
    }

    public void createNotification(long itemId, long userId) {
        Bid bid = bidRepository.findLatestBidByItemId(itemId);
        if(userId == bid.getUserId()) return;
        List<Notification> notifications = notificationRepository.findAllByItemIdAndUserId(itemId, bid.getUserId());
        if(notifications.size() == 0) {
            createNotification(new Notification(bid.getItemId(), bid.getUserId()));
        }
    }

    public String getAllNotificationsByUserId(long userId) {
        List<Notification> notifications = notificationRepository.findAllByUserId(userId);
        List<String> auctionItems = new ArrayList<>();
        for(Notification n : notifications) {
            if(n.getMessageId() != 0L) continue;
            AuctionItem ai = auctionItemRepository.findById(n.getItemId()).get();
            int highestBid = bidRepository.findMaxBidByItemId(ai.getId());
            auctionItems.add("{" +
                    "\"title\":\"" + ai.getTitle() + "\"," +
                    "\"itemId\":" + ai.getId() + "," +
                    "\"highestBid\":" + highestBid + "," +
                    "\"id\":" + n.getId() +
                    "}"
            );
        }
        return frontEndHelper.ToJson(auctionItems);
    }

    public void deleteNotification(long id, long userId) {
        Notification notification = notificationRepository.findById(id).get();
        if(notification.getUserId() == userId) notificationRepository.delete(notification);
    }

    public void deleteNotifications(String notificationIds, long userId) {
        String[] ids = notificationIds.split(",");
        for(String id : ids) {
            Notification notification = notificationRepository.findById(Long.parseLong(id)).get();
            if(notification.getUserId() == userId) notificationRepository.delete(notification);
        }
    }
}
