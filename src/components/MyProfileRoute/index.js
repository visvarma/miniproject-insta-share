import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileView from '../ProfileView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfileRoute extends Component {
  state = {
    myProfileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        profile: {
          id: fetchedData.profile.id,
          userId: fetchedData.profile.user_id,
          userName: fetchedData.profile.user_name,
          profilePic: fetchedData.profile.profile_pic,
          followersCount: fetchedData.profile.followers_count,
          followingCount: fetchedData.profile.following_count,
          userBio: fetchedData.profile.user_bio,
          postsCount: fetchedData.profile.posts_count,
          posts: fetchedData.profile.posts,
          stories: fetchedData.profile.stories,
        },
      }
      this.setState({
        myProfileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.setState(
      {apiStatus: apiStatusConstants.inProgress},
      this.getMyProfileData,
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/visvarma/image/upload/v1644594113/InstaShare%20%28Instagram-Clone%29/home-failure_vma1b7.png"
        alt="failure view"
        className="api-failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button className="failure-button" type="button" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderMyProfileSuccessView = () => {
    const {myProfileData} = this.state

    return (
      <div className="my-profile-container">
        <ProfileView profileData={myProfileData} userIdentification="my" />
      </div>
    )
  }

  renderMyProfileView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMyProfileSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderMyProfileView()}
      </>
    )
  }
}

export default MyProfileRoute
