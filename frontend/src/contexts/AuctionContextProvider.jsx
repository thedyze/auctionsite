import { createContext, useState, useEffect } from "react";

export const AuctionContextProvider = createContext();

export default function AuctionContextProvider(props) {

    const [auctions, setAuctions] = useState();

    const fetchAuctions = async () => {
        let res = await fetch("rest/auctionItem");
        res = await res.json();
        setAuctions(res)
    }

    useEffect(() => {
        fetchAuctions()
    }, []);

    const values = {
        auctions,
        fetchAuctions
    }

    return (
        <AuctionContext.Provider values={values}>
            {props.children}
        </AuctionContext.Provider>
    );
}