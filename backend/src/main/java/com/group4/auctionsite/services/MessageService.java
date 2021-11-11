package com.group4.auctionsite.services;

import com.group4.auctionsite.controllers.UserController;
import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Message;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import com.group4.auctionsite.repositories.MessageRepository;
import com.group4.auctionsite.repositories.UserRepository;
import com.group4.auctionsite.springSocket.socket.SocketModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private AuctionItemRepository auctionItemRepository;

    @Autowired
    private SocketModule socketModule;

    @Autowired
    private UserRepository userRepository;

    public List<Message> getAllMessages(){
        return messageRepository.findAll();
    }

    public Optional<Message> getById(long id) {
        return messageRepository.findById(id);
    }

    public Message createMessage(Message message) {
        socketModule.emit("messageUp", message);
        return messageRepository.save(message);
    }

    public List<Message> getMyMessages(long userId) {

        return messageRepository.findAllByReceiverIdOrSenderId(userId, userId);
    }

    public HashMap getMessagesByItemIdAndUserId(long itemId, long userId, long currentUserId) {

        List<Message> messages = messageRepository.findMessageByItemIdAndUserIdAndCurrentUserId(itemId, userId, currentUserId);

        String title = auctionItemRepository.findById(itemId).get().getTitle();
        String username = userRepository.findById(userId).get().getUsername();

        HashMap map = new HashMap();
        map.put( "title",title);
        map.put("messages",messages);
        map.put("username",username);

        return map;
    }
}
