package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.Message;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.services.MessageService;
import com.group4.auctionsite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.AuctionItemDetails.AuctionItemDetailsService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/rest/conversation")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private  UserService userService;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @PostMapping
    public Message createMessage(@RequestBody Message message) {
        return messageService.createMessage(message);
    }

    @GetMapping("/me")
    public  List<Message> getMyMessages() {

        User user = userService.findCurrentUser();

        if(user==null) {return null; }

        return messageService.getMyMessages(user.getId());
    }

    @GetMapping("/{itemId}/{userId}")
    public HashMap getMessagesByItemIdAndUserId(@PathVariable long itemId, @PathVariable long userId) {

        User user = userService.findCurrentUser();
        if(user==null || user.getId()==userId ) {return null; }

        return messageService.getMessagesByItemIdAndUserId(itemId, userId, user.getId());

    }

    @GetMapping("/my-messages")
    public  List<Message> getMessages() {

        User user = userService.findCurrentUser();

        if(user==null) {return null; }

        return messageService.getMessages(user.getId());
    }

}
