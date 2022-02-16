import {BsGrid3X3} from 'react-icons/bs'

import ProfilePostsView from '../ProfilePostsView'

import './index.css'

const ProfileView = props => {
  const {profileData, userIdentification} = props

  const {profile} = profileData
  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    posts,
    stories,
    postsCount,
  } = profile

  return (
    <>
      <div className="profile-container">
        <div className="profile-content-div">
          <img
            src={profilePic}
            alt={`${userIdentification} profile`}
            className="profile-img"
          />
          <div className="profile-info-container">
            <h1 className="profile-title">{userName}</h1>
            <div className="profile-stats-container">
              <p className="profile-stats">
                <span className="highlight">{postsCount}</span> Posts
              </p>
              <p className="profile-stats">
                <span className="highlight">{followersCount} </span> Followers
              </p>
              <p className="profile-stats">
                <span className="highlight">{followingCount} </span> Following
              </p>
            </div>
            <div className="bio-container">
              <p className="bio-name">{userId}</p>
              <p className="bio">{userBio}</p>
            </div>
          </div>
        </div>
        <div className="bio-container-mobile">
          <p className="bio-name">{userName}</p>
          <p className="bio">{userBio}</p>
        </div>

        <ul className="profile-stories">
          {stories.map(each => (
            <li className="profile-story" key={each.id}>
              <img
                src={each.image}
                className="profile-story-image"
                alt={`${userIdentification} story`}
              />
            </li>
          ))}
        </ul>
        <hr className="line" />
        <div className="profile-post-container">
          <div className="profile-post-logo-container">
            <BsGrid3X3 className="post-logo" />
            <h1 className="post-head">Posts</h1>
          </div>
          <ProfilePostsView
            posts={posts}
            userIdentification={userIdentification}
          />
        </div>
      </div>
    </>
  )
}

export default ProfileView
