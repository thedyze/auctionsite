package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "notification")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Long itemId;

    @ManyToOne
    private Long messageId;

    @ManyToOne
    private Long userId;
}
