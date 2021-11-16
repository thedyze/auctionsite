import { useContext, useEffect } from "react"
import { MessageContext } from "../contexts/MessageContext"
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";



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

  return (
    <div className="bg-myAw h-screen">
      <div className="text-center font-bold text-2xl py-5 text-myPr-dark">Messages</div>
      {messagesList?.map((m) => (
        <div className="border mx-3 my-2 flex  justify-between text-sm bg-white" onClick={()=>{handleGoCoversation(m)}} key={m.id}>
          <div className="flex items-center">
          <div className="p-1">
            <img src={m.path} alt="" />
            image
          </div>
          <div>
            <div className="text-myGr-dark font-bold">@{m.username}</div>   
            <div className="whitespace-nowrap overflow-x-hidden font-bold overflow-ellipsis" style={{maxWidth:"200px"}} >{m.title}</div>
            <div className="whitespace-nowrap overflow-x-hidden overflow-ellipsis text-gray-400" style={{maxWidth:"200px"}} >{m.messageContent}</div>
          </div>
          </div>
          <div className="text-xs text-gray-400 mr-1">{new Date(m.timestamp).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );

}