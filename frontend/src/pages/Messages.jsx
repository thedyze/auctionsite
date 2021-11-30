import { useContext, useEffect } from "react"
import { MessageContext } from "../contexts/MessageContext"
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { socket } from "../socket";


export const MessagesPage=()=>{
  const history =useHistory()

  const{messagesList,fetchMessagesList} =useContext(MessageContext)
  const { currentUser } = useContext(UserContext);


  useEffect(()=>{
    fetchMessagesList()
  },[])


 const  handleGoCoversation=(m)=>{
   if(currentUser.id!=m.senderId)
      history.push(`/conversation/${m.itemId}/${m.senderId}`);
   else
      history.push(`/conversation/${m.itemId}/${m.receiverId}`);
 }


 useEffect(async () => {
   let currentUser2 = await fetch("/api/whoami");
   currentUser2 = await currentUser2.json();
   socket.on("messageUp", (obj) => {
     if (currentUser2.id == obj.receiverId) {
       try {
         fetchMessagesList();
       } catch (e) {
         console.log("error in messages", e);
       }
     }
   });
   return () => {
     socket.disconnect();
   };
 }, []);


  return (
    <div className="bg-myAw h-screen">
      <div className="font-myHtext text-center font-bold text-2xl py-5 text-black">Messages</div>
       {messagesList?.map((m) => (
        <div className="border mx-3 my-2 text-sm bg-white" onClick={()=>{handleGoCoversation(m)}} key={m.id}>
          <div className="flex w-full items-center">
           <div className="p-1">
              <img className="h-24 w-24 object-cover" src={"/uploads/" + m.imagePath + "_img1.jpg"} alt="Item Picture" />            
           </div>
           <div style={{width:"80%"}}>
              <div className="text-xs text-gray-400 mr-1 text-right">{new Date(m.timestamp).toLocaleDateString()}</div>
              <div className="font-myHtext text-lg text-myGr-dark font-bold">@{m.username}</div>
              <div className="font-myPtext text-base whitespace-nowrap overflow-x-hidden font-bold overflow-ellipsis" style={{maxWidth:"230px"}} >{m.title}</div>
              <div className="font-myPtext text-lg whitespace-nowrap overflow-x-hidden overflow-ellipsis text-gray-400" style={{maxWidth:"230px"}} >{m.messageContent}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}