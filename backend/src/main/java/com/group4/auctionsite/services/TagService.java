package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.Tag;
import com.group4.auctionsite.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TagService {
    @Autowired
    TagRepository tagRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Tag createTag(Tag tag) {
        return tagRepository.save(tag);
    }

    public List<Long> getAllTagIdsOnAuctionItem(Long itemId) { return tagRepository.findAllTagIdsOnAuctionItem(itemId);}

    public List<Tag> getAllTagsByIds(List<Long> tagIds) { return tagRepository.findAllByIdIn(tagIds); }
}