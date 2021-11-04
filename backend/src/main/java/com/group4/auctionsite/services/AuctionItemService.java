package com.group4.auctionsite.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Bid;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import com.group4.auctionsite.repositories.BidRepository;
import com.group4.auctionsite.utils.FilterAuctionItem;
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
    ObjectMapperHelper objectMapperHelper = new ObjectMapperHelper();

    public List<AuctionItem> getAllAuctionItems() {
        return auctionItemRepository.findAll();
    }

    public String getById(long id) {
        Optional<AuctionItem> auctionItem = auctionItemRepository.findById(id);
        int highestBid = bidRepository.findMaxBidByItemId(id);
        int numberOfBids = bidRepository.numberOfBidsByItemId(id);
        return auctionItem.get().toJson(highestBid, numberOfBids);
    }

    public AuctionItem createAuctionItem(AuctionItem auctionItem) {
        return auctionItemRepository.save(auctionItem);
    }

    public List<AuctionItem> createAuctionItems(List<AuctionItem> auctionItems) {
        List<AuctionItem> auctionItemsx = new ArrayList<>();
        for(AuctionItem ai : auctionItems) {
            var c = auctionItemRepository.save(ai);
            auctionItemsx.add(c);
        }
        return  auctionItemsx;
    }
    public List<AuctionItem> getAuctionItemsByUserId(long userId) {
        return auctionItemRepository.findAllByUserId(userId);
    }

    public String placeBid(String bidx, long userId) {
        LinkedHashMap placedBid = (LinkedHashMap) objectMapperHelper.objectMapper(bidx);
        long itemId;
        int bid;

        try{
            itemId = Long.parseLong(placedBid.get("itemId").toString());
            bid = Integer.parseInt(placedBid.get("bid").toString());
        } catch(NumberFormatException e) {
            return "";
        }

        Optional<AuctionItem> auctionItem = auctionItemRepository.findById(itemId);
        if(auctionItem.isEmpty()) return "";
        if(bidRepository.findMaxBidByItemId(itemId) >= bid) return "";

        bidRepository.save(new Bid(itemId, userId, bid));

        return "success";
    }

    public List<AuctionItem> getFilteredAuctionItems(String filter) {

        filter = filter.replace("^", "\"");

        FilterAuctionItem filterContent = new FilterAuctionItem();
        try{
            filterContent = new ObjectMapper().readValue(filter, FilterAuctionItem.class);
        } catch (IOException e) {
            System.out.println(e);
        }

        String[] q = createQuery(filterContent);
        if(q[5].equals("default")) return auctionItemRepository.getFilteredAuctionItems(q[0], "%"+q[0]+"%", q[1], q[2], q[3], q[4]);
        else if(q[5].equals("popular")) return auctionItemRepository.getFilteredPopularAuctionItems(q[0], "%"+q[0]+"%", q[1], q[2], q[3], q[4]);
        return auctionItemRepository.getFilteredLatestAuctionItems(q[0], "%"+q[0]+"%", q[1], q[2], q[3], q[4]);
    }

    /*select i.* from auction_item as i, tag as t, itemXtag as x
WHERE (x.item_id = i.id AND x.tag_id = t.id)
AND LOWER(t.name) = LOWER('hugo')
--AND category_id = 1
AND current_bid BETWEEN 2000 AND 8000
UNION
select * from auction_item
WHERE LOWER(title) LIKE LOWER('%hugo%')
--AND category_id = 1
AND current_bid BETWEEN 2000 AND 8000
--ORDER BY number_of_bids DESC
--ORDER BY start_time DESC
ORDER BY end_time ASC

    String search;
    String categoryId;
    String currentBid;
    String numberOfBids;
    String startTime;
    String endTime;*/

    private String[] createQuery(FilterAuctionItem filterContent) {
        String[] query = new String[6];
        query[0] = filterContent.search != null ? filterContent.search : "";
        query[1] = filterContent.categoryId != null ? filterContent.categoryId : "0";
        query[2] = filterContent.categoryId != null ? filterContent.categoryId : "200000000";
        query[3] = filterContent.priceFrom != null ? filterContent.priceFrom : "0";
        query[4] = filterContent.priceTo != null ? filterContent.priceTo : "2000000000";
        query[5] = filterContent.buttonSelection != null ? filterContent.buttonSelection : "default";
        return query;
    }
}