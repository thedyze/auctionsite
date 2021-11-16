/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AuctionDetailsContext } from '../contexts/AuctionDetailsContext';
import CountdownTimer from "../components/CountdownTimer"

export default function BidModal({activateModal, id, auctionEndTime}) {

  const [open, setOpen] = useState(false)
  const [bid, setBid] = useState('');
  const [highestBid, setHighestBid] = useState('')
  const cancelButtonRef = useRef(null)
  const { fetchAuctionItem } = useContext(AuctionDetailsContext);

  const placeBid = async () => {
    if(!bid || !id) return
    let obj = {
      itemId: id,
      bid: bid,
    };

    let res = await fetch("/api/placeBid", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    });

    res = await res.json();

    if(res.highestBid) {
      setHighestBid(res.highestBid)
    } else {
      setOpen(false)
    }
    await fetchAuctionItem(id)
  };
  
  useEffect(() => {
    setOpen(activateModal !== "init")
  }, [activateModal])

  useEffect(() => {
    if(!open) {
      setHighestBid('')
    }
  }, [open])

    return (
    <Transition.Root show={open} as={Fragment} className="top-1/3 fixed">
      <Dialog as="div" className="flex justify-center z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span> 
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-myGr-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-myGr-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                      Time left: <CountdownTimer auctionEndTime={auctionEndTime}/>
                    </Dialog.Title>
                  </div>
                </div>
              </div>
              <div className="bg-myGr-dark px-4 py-3">
                <input
                type="number"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-base font-medium text-black text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark"
                  onChange={(e) => setBid(e.target.value)}
                  value={bid}
                  placeholder="SEK"
                />
                <button
                  type="button"
                  className="mt-5 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-20 py-2 bg-myGr-light text-base font-medium text-white focus:bg-myGr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark"
                  onClick={() => placeBid()}
                >
                  Place bid
                </button>
                <p className="mt-5 text-xl font-semibold text-red-500 text-center">
                  {highestBid && `Current price is: ${highestBid}`}
                </p>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
