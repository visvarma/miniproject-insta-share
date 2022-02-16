import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import {useState} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

const PostListItem = props => {
  const {data, likeUnlike} = props
  const {
    userId,
    postId,
    userName,
    profilePic,
    postDetailsCaption,
    postDetailsImageUrl,
    likesCount,
    comments,
    createdAt,
  } = data

  const [likeStatus, setLikeStatus] = useState(false)
  const [likesCountstate, setlikesCount] = useState(likesCount)

  const changeLikeStatus = () => {
    if (likeStatus) {
      setlikesCount(likesCountstate - 1)
    } else {
      setlikesCount(likesCountstate + 1)
    }
    setLikeStatus(!likeStatus)
    likeUnlike(postId, !likeStatus)
  }
  return (
    <li className="post-list-item">
      <div className="post-name-div">
        <img
          src={profilePic}
          className="post-profile-pic"
          alt="post author profile"
        />
        <Link to={`/users/${userId}`} className="link">
          <p className="post-username">{userName}</p>
        </Link>
      </div>
      <img src={postDetailsImageUrl} className="post-image" alt="post" />
      <div className="post-content-div">
        <div className="reaction-div">
          {likeStatus ? (
            <button
              className="reaction-button"
              testid="unLikeIcon"
              type="button"
              onClick={changeLikeStatus}
            >
              <FcLike className="react-image" width={20} />
            </button>
          ) : (
            <button
              className="reaction-button"
              testid="likeIcon"
              type="button"
              onClick={changeLikeStatus}
            >
              <BsHeart className="react-image" />
            </button>
          )}
          <button className="reaction-button" type="button">
            <FaRegComment className="react-image" />
          </button>
          <button className="reaction-button" type="button">
            <BiShareAlt className="react-image" />
          </button>
        </div>
        <p className="likes-count">{likesCountstate} likes</p>
        <p className="post-caption">{postDetailsCaption}</p>
        <ul className="post-comments-container">
          {comments.map(each => (
            <li className="comment" key={each.userId}>
              <p className="com">
                <Link to={`/users/${each.userId}`} className="link">
                  <span className="comment-name">{each.userName}:</span>
                </Link>
                {each.comment}
              </p>
            </li>
          ))}
        </ul>
        <p className="time">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostListItem
