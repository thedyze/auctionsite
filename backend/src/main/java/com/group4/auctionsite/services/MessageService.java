package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.Message;
import com.group4.auctionsite.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages(){
        return messageRepository.findAll();
    }

    public Optional<Message> getById(long id) {
        return messageRepository.findById(id);
    }

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getMyMessages(long userId) {

        return messageRepository.findAllByReceiverIdOrSenderId(userId, userId);
    }
}
