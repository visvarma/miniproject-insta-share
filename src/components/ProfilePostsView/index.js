import {BiCamera} from 'react-icons/bi'
import './index.css'

const ProfilePostsView = props => {
  const {posts, userIdentification} = props

  const postsView = () => (
    <ul className="user-posts-container">
      {posts.map(each => (
        <li className="post-image-container" key={each.id}>
          <img
            src={each.image}
            alt={`${userIdentification} post`}
            className="profile-post-image"
          />
        </li>
      ))}
    </ul>
  )

  const noPostView = () => (
    <div className="no-post-container">
      <BiCamera className="no-post-image" />
      <h1 className="no-post-head">No Posts Yet</h1>
    </div>
  )

  const displayView = () => {
    if (posts.length === 0) {
      return noPostView()
    }
    return postsView()
  }

  return displayView()
}

export default ProfilePostsView
