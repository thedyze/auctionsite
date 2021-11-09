import React, { useState, useEffect } from 'react'


export default function CountdownTimer(auctionEndTime) {

    const endTime = +new Date(parseInt(auctionEndTime.auctionEndTime));
    const currentTime = +new Date();
    const [countdown, setCountdown] = useState((endTime - currentTime));
    
    let formattedTime = [countdown];
   
    const formatTime = () => {

        if (countdown > 0) {
            formattedTime = {
              days: Math.floor(countdown / (1000 * 60 * 60 * 24)),
              hours: Math.floor((countdown / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((countdown / 1000 / 60) % 60),
              seconds: Math.floor((countdown / 1000) % 60)
          };
        }
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
 