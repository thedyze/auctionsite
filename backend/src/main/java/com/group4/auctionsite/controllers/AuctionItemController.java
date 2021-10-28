package com.group4.auctionsite.controllers;
import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.services.AuctionItemService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.AuctionItemDetails.AuctionItemDetailsService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

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
    public Optional<AuctionItem> getAuctionItemById(@PathVariable long id) {
        return auctionItemService.getById(id);
    }

    @PostMapping
    public AuctionItem createAuctionItem(@RequestBody AuctionItem auctionItem) {
        return auctionItemService.createAuctionItem(auctionItem);
    }

    @GetMapping("/filtered/{filter}")
    public List<AuctionItem> getFilteredAuctionItems(@PathVariable String filter) {
        return auctionItemService.getFilteredAuctionItems(filter);
    }
}