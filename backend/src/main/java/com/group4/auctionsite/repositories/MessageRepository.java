package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}
