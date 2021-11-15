package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.API;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface APIRepository extends JpaRepository<API, Long> {
}
