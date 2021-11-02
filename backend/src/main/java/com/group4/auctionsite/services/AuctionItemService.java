package com.group4.auctionsite.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Tag;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import com.group4.auctionsite.utils.FilterAuctionItem;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
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

    public List<AuctionItem> getFilteredAuctionItems(String filter) {

        filter = filter.replace("^", "\"");

        FilterAuctionItem filterContent = new FilterAuctionItem();
        try{
            filterContent = new ObjectMapper().readValue(filter, FilterAuctionItem.class);
        } catch (IOException e) {
            System.out.println(e);
        }

        String[] q = createQuery(filterContent);
        if(q[4].equals("default")) return auctionItemRepository.getFilteredAuctionItems(q[0], "%"+q[0]+"%", q[1], q[2], q[3]);
        else if(q[4].equals("popular")) return auctionItemRepository.getFilteredPopularAuctionItems(q[0], "%"+q[0]+"%", q[1], q[2], q[3]);
        return auctionItemRepository.getFilteredLatestAuctionItems(q[0], "%"+q[0]+"%", q[1], q[2], q[3]);
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
        String[] query = new String[5];
        query[0] = filterContent.search;
        query[1] = filterContent.categoryId != null ? filterContent.categoryId : "NOT NULL";
        query[2] = filterContent.priceFrom != null ? filterContent.priceFrom : "0";
        query[3] = filterContent.priceTo != null ? filterContent.priceTo : "2000000000";
        query[4] = filterContent.buttonSelection;

        return query;
    }

}