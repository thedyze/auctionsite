import { useContext, useEffect, useState } from "react";
import {APIContext} from "../contexts/APIContext";
import { UserContext} from "../contexts/UserContext"
import {APICalls} from "../components/API/APICalls"
import APIstyle from "../styles/API";
import APIModal from "../components/API/APIModal";

export const API = () => {
  const {apis} = useContext(APIContext)
  const {currentUser} = useContext(UserContext)
  const [api, setApi] = useState({entity:'', method:'', url:'', template:''})
  const [activateModal, setActivateModal] = useState('init')
  
  return (
    <div>
      {currentUser && (<APIModal activateModal={activateModal} api={api} />)}
      <div>
        <div className={APIstyle.h1}>
          AuctionItem
        </div>
        <div>
          <APICalls mauro={setApi} list={apis.filter(a => a.entity === "AuctionItem")} activateModal={setActivateModal}/>
        </div>
      </div>
      <textarea
        id="API-response"
        className="w-full h-40 inline-flex justify-center rounded-md border border-gray-300 shadow-sm my-1 bg-white text-base font-medium text-black"
      />
    </div>
  );
};
