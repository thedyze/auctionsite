package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionItemService {
    @Autowired
    AuctionItemRepository auctionItemRepository;

    public List<AuctionItem> getAllAuctionItems() {
        return auctionItemRepository.findAll();
    }

    public Optional<AuctionItem> getById(long id) {
        return auctionItemRepository.findById(id);
    }

    public AuctionItem createAuctionItem(AuctionItem auctionItem) {
        return auctionItem;
    }

    public List<AuctionItem> getFilteredAuctionItems(String filter) {
        return null;
    }

}
