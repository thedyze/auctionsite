import { useHistory } from "react-router-dom";

export const AuctionCard = (props) => {

    const { auction } = props;

    const history = useHistory()

    const goToAuctionDetails = (e) => {
        history.push(`/auctionItem/${auction.id}`)
    }
    
    return(
        <div onClick={goToAuctionDetails} className="h-40 flex bg-gray-200">
            <div className="w-2/5 h-full  bg-yellow-300">Image</div>
            <div className="p-2 w-full bg-green-300">
                <div className="text-white bg-green-500">{auction.title}</div>
                <div className="text-white bg-green-600">{auction.description}</div>
            </div>
        </div>
    );
}

