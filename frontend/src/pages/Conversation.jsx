import { MessageContext } from "../contexts/MessageContext"
import { useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import { useParams } from "react-router-dom"


export const Conversation = () => {
  const { itemId, userId } = useParams()
  const { messages, fetchMessages } = useContext(MessageContext)
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    if (itemId && userId)
      fetchMessages(itemId, userId)
  }, [itemId, userId])

  return (

    <div>
      {messages.map((m) =>
        <div key={m.id} style={currentUser.id == m.receiverId ? { textAlign: 'left' } : { textAlign: 'right' }}>{m.messageContent}</div>
      )}
    </div>
  )

}