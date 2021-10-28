package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
}
