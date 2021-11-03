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

    AuctionItem save(AuctionItem auctionItem);

    List<AuctionItem> findAllByUserId( long userId);

    AuctionItem findByIdAndCurrentBidLessThan(long id, int bid);

    @Query(value = "select i.* from auction_item as i, tag as t, itemXtag as x " +
            "WHERE (x.item_id = i.id AND x.tag_id = t.id) " +
            "AND LOWER(t.name) = LOWER(:search) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND current_bid BETWEEN :priceFrom AND :priceTo " +
            "UNION " +
            "select * from auction_item " +
            "WHERE LOWER(title) LIKE LOWER(:search2) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND current_bid BETWEEN :priceFrom AND :priceTo " +
            "ORDER BY number_of_bids DESC " +
          //  "--ORDER BY start_time DESC " +
            "--ORDER BY end_time ASC ", nativeQuery = true)
    List<AuctionItem> getFilteredPopularAuctionItems(@Param("search") String search, @Param("search2") String search2, @Param("categoryId") String categoryId, @Param("categoryId2") String categoryId2, @Param("priceFrom") String priceFrom, @Param("priceTo") String priceTo);

    @Query(value = "select i.* from auction_item as i, tag as t, itemXtag as x " +
            "WHERE (x.item_id = i.id AND x.tag_id = t.id) " +
            "AND LOWER(t.name) = LOWER(:search) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND current_bid BETWEEN :priceFrom AND :priceTo " +
            "UNION " +
            "select * from auction_item " +
            "WHERE LOWER(title) LIKE LOWER(:search2) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND current_bid BETWEEN :priceFrom AND :priceTo " +
           // "--ORDER BY number_of_bids DESC " +
            "ORDER BY start_time DESC " +
            "--ORDER BY end_time ASC ", nativeQuery = true)
    List<AuctionItem> getFilteredLatestAuctionItems(@Param("search") String search, @Param("search2") String search2, @Param("categoryId") String categoryId, @Param("categoryId2") String categoryId2, @Param("priceFrom") String priceFrom, @Param("priceTo") String priceTo);

    @Query(value = "select i.* from auction_item as i, tag as t, itemXtag as x " +
            "WHERE (x.item_id = i.id AND x.tag_id = t.id) " +
            "AND LOWER(t.name) = LOWER(:search) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND current_bid BETWEEN :priceFrom AND :priceTo " +
            "UNION " +
            "select * from auction_item " +
            "WHERE LOWER(title) LIKE LOWER(:search2) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND current_bid BETWEEN :priceFrom AND :priceTo " +
           // "--ORDER BY number_of_bids DESC " +
         //   "--ORDER BY start_time DESC " +
            "ORDER BY end_time ASC ", nativeQuery = true)
    List<AuctionItem> getFilteredAuctionItems(@Param("search") String search, @Param("search2") String search2, @Param("categoryId") String categoryId, @Param("categoryId2") String categoryId2, @Param("priceFrom") String priceFrom, @Param("priceTo") String priceTo);
}