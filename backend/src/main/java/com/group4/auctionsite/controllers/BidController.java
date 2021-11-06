package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.services.AuctionItemService;
import com.group4.auctionsite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BidController {

    @Autowired
    private AuctionItemService auctionItemService;
    @Autowired
    private UserService userService;

    @PostMapping("/placeBid")
    public ResponseEntity<String> placeBid(@RequestBody String bid) {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(401).build();
        String res = auctionItemService.placeBid(bid, user.getId());
        if(!(res.contains("success") || res.contains("highestBid"))) return ResponseEntity.status(400).build();
        return ResponseEntity.ok(res);
    }
}
