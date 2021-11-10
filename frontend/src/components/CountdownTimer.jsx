import React, { useState, useEffect } from 'react'


export default function CountdownTimer(auctionEndTime) {

    const endTime = +new Date(parseInt(auctionEndTime.auctionEndTime));
    const currentTime = +new Date();
    const [countdown, setCountdown] = useState((endTime - currentTime));
    const [formattedTime, setFormattedTime] = useState(['']);
    
    const formatTime = () => {
        
        let format = [];
        let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        let hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((countdown / (1000 * 60)) % 60);
        let seconds = Math.floor((countdown / 1000) % 60);
        
        if (countdown < 0) {
            format = ["Auction expired"]
        }
        if(countdown > 172800000){
            format = [days, " days"]
        };
        if(countdown > 86400000 && countdown < 172800000){
            format = [days, " day ", hours," hours"]
        };
        if(countdown > 3600000 && countdown < 86400000){
            format = [hours, " hours ", minutes, " min"]
        };
        if(countdown > 60000 && countdown < 3600000){
            format = [minutes, " min ", seconds, " s"]
        };
         if(countdown > 0 && countdown < 6000){
            format = [seconds, " s"]
        };
        return format
    }   

    useEffect(() => {
        const timer = setTimeout(() => {setCountdown(countdown - 1000); setFormattedTime(formatTime());}, 1000);
        return () => clearTimeout(timer);
    });
    
    return (
        <div>{formattedTime}</div>
    );
  }
 