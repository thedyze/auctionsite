package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionItemRepository extends JpaRepository<AuctionItem, Long> {

    @Query(value = "select i.* from auction_item as i, tag as t, itemXtag as x\n" +
            "WHERE (x.item_id = i.id AND x.tag_id = t.id)\n" +
            "AND LOWER(t.name) = LOWER('hugo')\n" +
            "AND category_id IS 1\n" +
            "AND current_bid BETWEEN 2000 AND 8000\n" +
            "UNION \n" +
            "select * from auction_item \n" +
            "WHERE LOWER(title) LIKE LOWER('%hugo%')\n" +
            "AND category_id IS 1\n" +
            "AND current_bid BETWEEN 2000 AND 8000\n" +
            "--ORDER BY number_of_bids DESC\n" +
            "--ORDER BY start_time DESC\n" +
            "ORDER BY end_time ASC", nativeQuery = true)
    List<AuctionItem> getFilteredAuctionItems( String query);
}