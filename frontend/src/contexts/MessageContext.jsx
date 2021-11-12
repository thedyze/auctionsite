import { createContext, useState } from 'react'

export const MessageContext = createContext();

export default function MessageProvider(props) {
  const [messages, setMessages] = useState([])

  const fetchMessages = async (itemId, userId) => {
    
    try {
      let res = await fetch(`/rest/conversation/${itemId}/${userId}`)
        res = await res.json();
        setMessages(res);
      
    } catch (e) {
      console.log(e);
      
    }
  
  }

  const values = {
    messages,
    fetchMessages
  }


  return (
    <MessageContext.Provider value={values}>
      {props.children}
    </MessageContext.Provider>
  )
}