/* This example requires Tailwind CSS v2.0+ */

import Alert from '@mui/material/Alert';
import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/solid";
import { LoginTemplate } from "../components/LoginForm";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { NotificationContext } from "../contexts/NotificationContext";
import { socket } from "../socket";


export default function Navbar() {
  const history = useHistory();
  const iconRef = useRef()

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { notifications, setNotifications, deleteNotification, deleteNotifications } = useContext(NotificationContext)
  const [toggleToast, setToggleToast] = useState(false)
  const [toastLogin, setToastLogin] = useState()

  const logout = () => {
    fetch("/logout");
    setCurrentUser("")
    history.push("/");
    setToggleToast(true);
    setToastLogin(p => !p);
    setTimeout(() => {
      setToggleToast(false)
    }, 2500)
    setToastLogin('');
  };

  const pathTo = (e) => {
    history.push(`/${e.target.name}`);
  }

  const handleNotification = async (n) => {
     await deleteNotification(n.id);

    if(n.messageId) history.push(`/conversation/${n.itemId}/${n.correctUserId || n.userId}`)
    else  history.push(`/auction-details/${n.itemId}`);

    
  }

  const clearAll = async () => {
    await deleteNotifications(notifications.map(n => n.id))
  }


  socket.on("notification", (n, t, u) => {
    if (n.userId == currentUser.id) {
      let list = []
      for (let i = 0; i < notifications.length; i++) {
        list.push(notifications[i])
      }
      n.title = t
      n.correctUserId=u
      list.push(n)
      setNotifications(list)
    }
  })

  const removeCallback = () => {
    iconRef.current.click()
  }

  const pagesArray = ["Create", "Buying", "Selling", "Messages", "About"];

  return (
    <Disclosure as="nav" className="bg-myPr-light fixed w-screen top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white ">
        <div className="relative flex items-center justify-between h-14 ">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex-1 flex items-center justify-left sm:items-stretch sm:justify-start ">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={pathTo}
                id="logo"
                style={{ textShadow: "1px 2px 0px #000000" }}
                className="font-logo text-3xl block lg:hidden h-8 w-auto ">
                Kwik
              </button>
            </div>
            <div className="hidden sm:block sm:ml-6"></div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {currentUser && (
              <Menu as="div" className="ml-3 relative">
                <div className="relative">
                  <Menu.Button>
                    <BellIcon className="h-8 w-8 text-white" aria-hidden="true" />
                  </Menu.Button>
                  {notifications.length > 0 && (
                    <span className="text-xs text-center absolute h-4 w-4 rounded-full bg-red-600 left-5">
                      {notifications.length}
                    </span>
                  )}
                </div>
                <Menu.Items className="font-myHtext fixed bg-gray-700 w-44 right-0 top-16">
                  <div>
                    {notifications &&
                      notifications.map((n) => (
                        <Menu.Item key={n.id} onClick={() => handleNotification(n)} >
                          <div className="bg-white px-2 py-2 text-sm text-gray-700" href="/myPage" >
                            <div className="font-semibold">{n?.title}</div>
                            <div>
                              {n.messageId ?<span className="text-myGr-dark">New message!</span>: n.highestBid ? <span  className="text-myRe">New bid: {n.highestBid} kr</span> : <span className="text-myRe" >New bid!</span>}

                            </div>  
                          </div>
                        </Menu.Item>
                      ))}
                    {notifications.length > 0 && (<div className=" bg-white py-2 text-xs text-myPr-dark text-center" onClick={() => { clearAll() }}> clear all </div>)}
                  </div>
                </Menu.Items>
              </Menu>
            )}
            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              <Menu.Button className="flex text-sm rounded-full ">
                <div id="iconRef" ref={iconRef}>
                  <UserCircleIcon id="userCircleIcon" className="h-11 w-11" aria-hidden="true" />
                </div>
              </Menu.Button>
              <Menu.Items className="fixed bg-white border-l-2 border-b-2 w-44 right-0 top-14">
                {currentUser ? (
                  <div className="hola">
                    <Menu.Item>
                      <div className="block px-4 py-3 text-sm font-bold bg-myGr-disabled text-myGr-dark text-center" href="/myPage">
                        @{currentUser.username}
                      </div>
                    </Menu.Item>
                    {pagesArray.map((page, i) => (
                      <Menu.Item key={i}>
                        <a name={page} onClick={pathTo} className="block px-4 py-3 text-lg text-gray-700 text-center" > {page}</a>
                      </Menu.Item>
                    ))}
                    <Menu.Item><a onClick={logout} className="block px-4 py-3 text-white font-semibold text-center"><div className="bg-myGr-light py-1 rounded-md">Log out</div></a></Menu.Item>
                  </div>
                ) : (
                  <Menu.Item>
                    <LoginTemplate callback={removeCallback} setCurrentUser={setCurrentUser} toggleToast={setToggleToast} toastLogin={setToastLogin} />
                  </Menu.Item>
                )}
              </Menu.Items>
            </Menu>
          </div>
        </div>
        {toggleToast && <Alert variant="filled" severity="success" style={{ backgroundColor: '#6acf9d' }}>
          {toastLogin ? "You have been LOGGED IN!" : "You have been LOGGED OUT!"}
        </Alert>}
      </div>
    </Disclosure>
  );
}
