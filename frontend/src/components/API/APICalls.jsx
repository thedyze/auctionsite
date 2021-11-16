import { APIGet } from "./APIGet"
import { APIPost } from "./APIPost"

export const APICalls = ({list, activateModal, mauro}) => {

  return(
    <div>
      <div>
        <APIGet mauro={mauro} gets={list.filter(a => a.method === "GET")} activateModal={activateModal} />
      </div>
      <div>
        <APIPost mauro={mauro} posts={list.filter(a => a.method === "POST")} activateModal={activateModal} />
      </div>
    </div>
  )
}