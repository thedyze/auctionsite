package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionItemService {
    @Autowired
    AuctionItemRepository auctionItemRepository;

    public List<AuctionItem> getFilteredItems(){
        return getFilteredItems();
    }
}
