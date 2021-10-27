package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "message")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Long senderId;

    @ManyToOne
    private Long receiverId;

    private Long timestamp;
    private String messageContent;

}
