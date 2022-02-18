import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import PostCard from '../PostCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  empty: 'EMPTY',
}

class SearchPosts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postList: [],
      postApiStatus: apiStatusConstants.initial,
      search: props.search,
    }
  }

  componentDidMount() {
    this.getPostList()
  }

  getPostList = async () => {
    this.setState({
      postApiStatus: apiStatusConstants.inProgress,
    })
    const {search} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      if (fetchedData.posts.length === 0) {
        this.setState({postApiStatus: apiStatusConstants.empty})
      } else {
        const formattedData = fetchedData.posts.map(each => ({
          comments: each.comments.map(each2 => ({
            userName: each2.user_name,
            userId: each2.user_id,
            comment: each2.comment,
          })),
          createdAt: each.created_at,
          likesCount: each.likes_count,
          postDetailsCaption: each.post_details.caption,
          postDetailsImageUrl: each.post_details.image_url,
          postId: each.post_id,
          profilePic: each.profile_pic,
          userId: each.user_id,
          userName: each.user_name,
        }))

        this.setState({
          postList: formattedData,
          postApiStatus: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({postApiStatus: apiStatusConstants.failure})
    }
  }

  renderPostView = () => {
    const {postList, search} = this.state

    console.log(search)
    return (
      <>
        <h1 className="search-results-heading">Search Results</h1>
        <PostCard postData={postList} key={search} />
      </>
    )
  }

  onRetryPost = () => {
    this.setState(
      {postApiStatus: apiStatusConstants.inProgress},
      this.getPostList,
    )
  }

  renderPostFailureView = () => (
    <div className="failure-post-container">
      <img
        src="https://res.cloudinary.com/visvarma/image/upload/v1644594113/InstaShare%20%28Instagram-Clone%29/home-failure_vma1b7.png"
        alt="failure view"
        className="api-failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryPost}
      >
        Try again
      </button>
    </div>
  )

  renderNoSearchResultView = () => (
    <div className="zero-search-result">
      <img
        src="https://res.cloudinary.com/visvarma/image/upload/v1645026042/InstaShare%20%28Instagram-Clone%29/GroupSearchNotFound_xgt8xz.png"
        alt="search not found"
        className="search-not-found"
      />
      <h1 className="search-not-found-heading">Search Not Found</h1>
      <p className="search-not-found-para">
        Try different keyword or search again
      </p>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        testid="loader"
        type="TailSpin"
        color="#4094EF"
        height={50}
        width={50}
      />
    </div>
  )

  displayPostView = () => {
    const {postApiStatus} = this.state
    switch (postApiStatus) {
      case apiStatusConstants.success:
        return this.renderPostView()
      case apiStatusConstants.failure:
        return this.renderPostFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.empty:
        return this.renderNoSearchResultView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return <>{this.displayPostView()}</>
  }
}

export default SearchPosts
