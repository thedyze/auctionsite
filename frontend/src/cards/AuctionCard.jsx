import { useHistory } from "react-router-dom";

export const AuctionCard = (props) => {

    const { auction } = props;

    const history = useHistory()

    const goToAuctionDetails = (e) => {
        history.push(`/auction-details/${auction.id}`)
    }

    


    
    return(
        <div onClick={goToAuctionDetails} className="h-30 flex bg-gray-200">
            { false ? (
                    <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"></img>
                  ) : (
                    <img className="w-3/5" src="" alt="Bild saknas"></img>
                  )}
            <div className="p-2 w-full bg-green-300">
                <div className="text-white bg-green-500">{auction.title}</div>
                <div className="text-white bg-green-600">{auction.description}</div>
            </div>
        </div>
    );
}

