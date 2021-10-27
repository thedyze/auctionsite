package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "auction_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuctionItem {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Long userId;

    @OneToMany
    private Long categoryId;

    private String description;
    private String title;
    private Long startTime;
    private Long endTime;
    private Integer currentBid;
    private Integer startPrice;
    private Integer currentViews;
    private Integer numberOfBids;

}
