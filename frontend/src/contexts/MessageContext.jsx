import { createContext, useEffect, useState } from 'react'

export const MessageContext = createContext();

export default function MessageProvider(props) {
  const [messages, setMessages] = useState([])

  const fetchMessages = async (itemId, userId) => {
    let res = await fetch(`/rest/conversation/${itemId}/${userId}`)
    console.log(res);
    res = await res.json()
    setMessages(res)
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