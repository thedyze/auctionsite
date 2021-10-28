package com.group4.auctionsite.controllers;
import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.services.AuctionItemService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.AuctionItemDetails.AuctionItemDetailsService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("rest/auction_item")
public class AuctionItemController {
    @Autowired
    private AuctionItemService auctionItemService;

    @GetMapping
    public List<AuctionItem> getAllAuctionItems() {
        return AuctionItemService.getAllAuctionItems();
    }

    @GetMapping("/{id}")
    public Optional<AuctionItem> getAuctionItemById(@PathVariable long id) {
        return AuctionItemService.getById(id);
    }

    @PostMapping
    public AuctionItem createAuctionItem(@RequestBody AuctionItem auctionItem) {
        return AuctionItemService.createAuctionItem(auctionItem);
    }

    /*@GetMapping("/filtered/{filter}, method = GET")
    public List<AuctionItem> getFilteredAuctionItems(@RequestParam(required = false)) {
        return AuctionItemService.getFilteredAuctionItems();
    }*/
}
