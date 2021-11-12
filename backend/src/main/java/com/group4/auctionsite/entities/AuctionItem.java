package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "auction_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuctionItem {

    @Id
    @GeneratedValue
    private long id;
    private long userId;
    private long categoryId;
    private String description;
    private String title;
    private long startTime;
    private long endTime;
    private int startPrice;
    private Integer buyNowPrice;
    private int currentViews;

    private boolean isActive(){
        return this.endTime > new Date().getTime();
    }

    public String toJson(int highestBid, int numberOfBids) {
        return "{" +
                "\"id\":\""+this.id+"\", " +
                "\"userId\":\""+this.userId+"\", " +
                "\"categoryId\":\""+this.categoryId+"\", " +
                "\"description\":\""+this.description+"\", " +
                "\"title\":\""+this.title+"\", " +
                "\"startTime\":\""+this.startTime+"\", " +
                "\"endTime\":\""+this.endTime+"\", " +
                "\"startPrice\":\""+this.startPrice+"\", " +
                "\"buyNowPrice\":\""+this.buyNowPrice+"\", " +
                "\"currentViews\":\""+this.currentViews+"\", " +
                "\"highestBid\":\""+highestBid+"\", " +
                "\"numberOfBids\":\""+numberOfBids+"\"" +
                "}";
    }
}
