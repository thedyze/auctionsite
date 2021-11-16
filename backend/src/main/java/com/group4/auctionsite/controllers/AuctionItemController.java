package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.services.AuctionItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// import org.springframework.security.core.AuctionItemDetails.AuctionItemDetailsService;

@RestController
@RequestMapping("rest/auctionItem")
public class AuctionItemController {
    @Autowired
    private AuctionItemService auctionItemService;

    @GetMapping
    public List<AuctionItem> getAllAuctionItems() {
        return auctionItemService.getAllAuctionItems();
    }

    @GetMapping("/{id}")
    public String getAuctionItemById(@PathVariable long id) {
        return auctionItemService.getById(id);
    }

    @GetMapping("/user/{userId}")
    public String getAuctionItemsByUserId(@PathVariable long userId) {
        return auctionItemService.getAuctionItemsByUserId(userId);
    }

    @GetMapping("/userBuying/{userId}")
    public String getAuctionItemsByUserBuying(@PathVariable long userId) {
        return auctionItemService.getAuctionItemsByUserBuying(userId);
    }

    @PostMapping
    public AuctionItem createAuctionItem(@RequestBody String auctionItem) {
        return auctionItemService.createAuctionItem(auctionItem);
    }

    @PostMapping("/s")
    public List<AuctionItem> createAuctionItems(@RequestBody List<AuctionItem> auctionItems) {
        return auctionItemService.createAuctionItems(auctionItems);
    }

    @GetMapping("/filtered/{filter}")
    public String getFilteredAuctionItems(@PathVariable String filter) {
        return auctionItemService.getFilteredAuctionItems(filter);
    }
}