import API from "../../styles/API"


export const APIPost = ({posts, activateModal, mauro, role}) => {

  const showModal = (api) => {
    if(role != 'ADMIN') return
    mauro(api)
    activateModal(p => !p)
  }

  return (
    <div>
      <div>
        {posts.map(api => (
          <div
          key={api.id}
          className={API.card + API.postCard}
            onClick={() => showModal(api)}>
            <div className={API.method + API.postMethod}>
              {api.method}
            </div>
            <div className={API.url}>
              {api.url}
              {role != 'ADMIN' && <p className="text-xs">Only admins can post</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}