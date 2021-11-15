package com.group4.auctionsite.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Bid;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import com.group4.auctionsite.repositories.BidRepository;
import com.group4.auctionsite.repositories.UserRepository;
import com.group4.auctionsite.utils.FilterAuctionItem;
import com.group4.auctionsite.utils.FrontEndHelper;
import com.group4.auctionsite.utils.ObjectMapperHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class AuctionItemService {
    @Autowired
    AuctionItemRepository auctionItemRepository;
    @Autowired
    BidRepository bidRepository;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    NotificationService notificationService;
    ObjectMapperHelper objectMapperHelper = new ObjectMapperHelper();
    FrontEndHelper frontEndHelper = new FrontEndHelper();

    public List<AuctionItem> getAllAuctionItems() {
        return auctionItemRepository.findAll();
    }

    public String getById(long id) {
        Optional<AuctionItem> auctionItem = auctionItemRepository.findById(id);
        User user = userService.findCurrentUser();
        int highestBid = bidRepository.findMaxBidByItemId(id);
        if (user !=null) {
            highestBid = (int) (highestBid * (user.getRole().contains("organization") ? 0.8 : 1));
            var a=0;
        }
        int numberOfBids = bidRepository.numberOfBidsByItemId(id);
        return auctionItem.get().toJson(highestBid, numberOfBids);
    }

    public AuctionItem createAuctionItem(AuctionItem auctionItem) {
       auctionItem = auctionItemRepository.save(auctionItem);
       User user =userService.findCurrentUser();
       bidRepository.save(new Bid(auctionItem.getId(),user.getId(),0));
       return auctionItem;
    }
                
    public List<AuctionItem> createAuctionItems(List<AuctionItem> auctionItems) {
        List<AuctionItem> auctionItemsx = new ArrayList<>();
        for(AuctionItem ai : auctionItems) {
            var c = auctionItemRepository.save(ai);
            auctionItemsx.add(c);
        }
        return  auctionItemsx;
    }
    public String getAuctionItemsByUserId(long userId) {
            List<String> updatedList=new ArrayList<>();

        List<AuctionItem> itemList =auctionItemRepository.findAllByUserId(userId);
        for(AuctionItem item:itemList){
            updatedList.add(item.toJson(bidRepository.findMaxBidByItemId(item.getId()), bidRepository.numberOfBidsByItemId(item.getId())));
        }
        return frontEndHelper.ToJson(updatedList);
    }




    public String placeBid(String bidx, long userId) {
        LinkedHashMap placedBid = (LinkedHashMap) objectMapperHelper.objectMapper(bidx);
        User user = userRepository.findById(userId).get();
        long itemId;
        int bid;

        try{
            itemId = Long.parseLong(placedBid.get("itemId").toString());
            bid = (int) (Integer.parseInt(placedBid.get("bid").toString()) * (user.getRole().matches("organization") ? 1.25 : 1));
        } catch(NumberFormatException e) {
            return "";
        }

        Optional<AuctionItem> auctionItem = auctionItemRepository.findById(itemId);
        if(auctionItem.isEmpty()) return "";

        int highestBid = bidRepository.findMaxBidByItemId(itemId);
        if(highestBid >= bid) {
            highestBid = (int) (highestBid * (user.getRole().matches("organization") ? 0.8 : 1));
            return "{\"highestBid\":" + highestBid + "}";
        }



        if(highestBid > 0) notificationService.createNotification(itemId, userId);
        bidRepository.save(new Bid(itemId, userId, bid));


        return "{" +
                "\"itemId\":" + itemId + "," +
                "\"newBid\":" + (int) (bid * (user.getRole().matches("organization") ? 0.8 : 1)) +
                "}";
    }

    public String getFilteredAuctionItems(String filter) {
        FilterAuctionItem filterContent = new FilterAuctionItem();
        try{
            filterContent = new ObjectMapper().readValue(filter, FilterAuctionItem.class);
        } catch (IOException e) {
            System.out.println(e);
        }

        List<AuctionItem> auctionItems = null;
        String[] q = createQuery(filterContent);
        if(q[6].equals("default")) auctionItems = auctionItemRepository.getFilteredAuctionItems(q[0], "%"+q[0]+"%", Integer.parseInt(q[1]), Integer.parseInt(q[2]), Integer.parseInt(q[3]), Integer.parseInt(q[4]), 20, Integer.parseInt(q[5]));
        else if(q[6].equals("popular")) auctionItems = auctionItemRepository.getFilteredPopularAuctionItems(q[0], "%"+q[0]+"%", Integer.parseInt(q[1]), Integer.parseInt(q[2]), Integer.parseInt(q[3]), Integer.parseInt(q[4]), 20, Integer.parseInt(q[5]));
        else if(q[6].equals("latest")) auctionItems = auctionItemRepository.getFilteredLatestAuctionItems(q[0], "%"+q[0]+"%", Integer.parseInt(q[1]), Integer.parseInt(q[2]), Integer.parseInt(q[3]), Integer.parseInt(q[4]), 20, Integer.parseInt(q[5]));

        List<String> auctionItemsAsJson = new ArrayList<>();
        User user = userService.findCurrentUser();
        for(AuctionItem item : auctionItems) {

            int highestBid = bidRepository.findMaxBidByItemId(item.getId());
            if (user !=null) {
                highestBid = (int) (bidRepository.findMaxBidByItemId(item.getId()) * (user.getRole().matches("organization") ? 0.8 : 1));
            }
            int numberOfBids = bidRepository.numberOfBidsByItemId(item.getId());
            auctionItemsAsJson.add(item.toJson(highestBid, numberOfBids));
        }

        return frontEndHelper.ToJson(auctionItemsAsJson);
    }

    private String[] createQuery(FilterAuctionItem filterContent) {
        String[] query = new String[8];
        query[0] = filterContent.search != null ? filterContent.search : "";
        query[1] = filterContent.categoryId != null ? filterContent.categoryId : "0";
        query[2] = filterContent.categoryId != null ? filterContent.categoryId : "200000000";
        query[3] = filterContent.priceFrom != null ? filterContent.priceFrom : "0";
        query[4] = filterContent.priceTo != null ? filterContent.priceTo : "2000000000";
        query[5] = filterContent.page != null ? filterContent.page : "0";
        query[6] = filterContent.buttonSelection != null ? filterContent.buttonSelection : "default";
        return query;
    }
}