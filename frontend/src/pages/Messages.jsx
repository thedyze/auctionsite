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
   if(currentUser.id!==m.senderId)
      history.push(`/conversation/${m.itemId}/${m.senderId}`);
   else
      history.push(`/conversation/${m.itemId}/${m.receiverId}`);
 }

  return (
    <div className="bg-myAw h-screen">
      <div className="text-center font-bold text-2xl py-5 text-myPr-dark">Messages</div>
      {messagesList?.map((m) => (
        <div  onClick={()=>{handleGoCoversation(m)}} key={m.id}>
          <div>{m.senderId}</div>
          <div >{m.messageContent}</div>
          <div>{new Date(m.timestamp).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );

}