package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.API;
import com.group4.auctionsite.entities.Category;
import com.group4.auctionsite.repositories.APIRepository;
import com.group4.auctionsite.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class APIService {
    @Autowired
    APIRepository apiRepository;

    public List<API> getAllAPIs() {
        return apiRepository.findAll();
    }
}
