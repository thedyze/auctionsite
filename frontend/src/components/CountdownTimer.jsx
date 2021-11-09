import React, { useState, useEffect } from 'react'


export default function CountdownTimer(auctionEndTime) {

    const endTime = +new Date(parseInt(auctionEndTime.auctionEndTime));
    const currentTime = +new Date();
    const [countdown, setCountdown] = useState((endTime - currentTime));
    
    let formattedTime = [countdown];
   
    const formatTime = () => {

        let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        let hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((countdown / (1000 * 60)) % 60);
        let seconds = Math.floor((countdown / 1000) % 60);
        let expired = "Auction expired";

        //check if 0 or below, give "auction expired"
        if (countdown > 0) {
            
        }
        // check if over 1 day, give days and hours
        if(countdown > 86400000){

        };

        // check if over 1h and under 24h, give hours and minutes
        if(countdown > 3600000 && countdown < 86400000){

        };

        // check if over 1min, give minutes and seconds
        if(countdown > 60000 && countdown < 3600000){

        };
        
         // check if under 1min, give seconds
         if(countdown <= 60000){

        };

      return formattedTime;
    }   
    
    useEffect(() => {
        const timer = setTimeout(() => {setCountdown(countdown - 1000);}, 1000);
        formatTime();
        return () => clearTimeout(timer);
    });

    return (
        <div>{formattedTime}</div>
    );
  }
 