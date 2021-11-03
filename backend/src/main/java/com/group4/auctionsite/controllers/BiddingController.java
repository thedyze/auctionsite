package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.services.AuctionItemService;
import com.group4.auctionsite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class BiddingController {

    @Autowired
    private AuctionItemService auctionItemService;

    @PostMapping("/placeBid")
    public AuctionItem placeBid(@RequestBody String bid) {
        return auctionItemService.placeBid(bid);
    }
}
