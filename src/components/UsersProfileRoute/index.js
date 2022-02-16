import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProfileView from '../ProfileView'

import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UsersProfileRoute extends Component {
  state = {
    apiStatus: apiConstants.initial,
    profileDetails: [],
  }

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {userId} = params

    const token = Cookies.get('jwt_token')

    this.setState({apiStatus: apiConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = {
        profile: {
          id: fetchedData.user_details.id,
          userId: fetchedData.user_details.user_id,
          userName: fetchedData.user_details.user_name,
          profilePic: fetchedData.user_details.profile_pic,
          followersCount: fetchedData.user_details.followers_count,
          followingCount: fetchedData.user_details.following_count,
          userBio: fetchedData.user_details.user_bio,
          postsCount: fetchedData.user_details.posts_count,
          posts: fetchedData.user_details.posts.map(each => ({
            id: each.id,
            image: each.image,
          })),
          stories: fetchedData.user_details.stories.map(each => ({
            id: each.id,
            image: each.image,
          })),
        },
      }

      this.setState({
        profileDetails: formattedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.setState(
      {apiStatus: apiConstants.inProgress},
      this.getUserProfileDetails,
    )
  }

  renderUserProfileFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643651534/insta%20Shere%20clone/alert-triangle_hczx0o.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-head">Something went wrong. Please try again</p>
      <button className="failure-button" type="button" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderUserProfileSuccessView = () => {
    const {profileDetails} = this.state

    return (
      <div className="my-profile-container">
        <ProfileView profileData={profileDetails} userIdentification="user" />
      </div>
    )
  }

  renderUserProfileView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderUserProfileSuccessView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.renderUserProfileFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderUserProfileView()}
      </>
    )
  }
}

export default UsersProfileRoute
