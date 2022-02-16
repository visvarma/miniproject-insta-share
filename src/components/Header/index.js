import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const [menuToggle, setMenuToggle] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onOpenMenu = () => {
    setMenuToggle(false)
  }
  const onCloseMenu = () => {
    setMenuToggle(true)
  }

  const onChangeSearchInput = e => {
    setSearchInput(e.target.value)
  }

  const onClickSearchInput = () => {
    const {onSearchCaption} = props
    onSearchCaption(searchInput)
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <div className="header-website-logo-container">
            <Link to="/" className="nav-link">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/visvarma/image/upload/v1644510074/InstaShare%20%28Instagram-Clone%29/Login-lg-Logo_wjasnt.png"
                alt="website logo"
              />
            </Link>
            <h1 className="header-website-logo-heading">Insta Share</h1>
          </div>

          <button type="button" className="nav-mobile-btn">
            <img
              src="https://res.cloudinary.com/visvarma/image/upload/v1644583989/InstaShare%20%28Instagram-Clone%29/header-hamburger_blr5em.png"
              alt="nav hamburger"
              className="nav-bar-image"
              onClick={onOpenMenu}
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <div className="header-website-logo-container">
            <Link to="/" className="nav-link">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/visvarma/image/upload/v1644510074/InstaShare%20%28Instagram-Clone%29/Login-lg-Logo_wjasnt.png"
                alt="website logo"
              />
            </Link>
            <h1 className="header-website-logo-heading">Insta Share</h1>
          </div>

          <ul className="nav-menu">
            <li className="nav-menu-item search-input-container ">
              <input
                value={searchInput}
                type="search"
                className="search-input"
                placeholder="Search Caption"
                onChange={onChangeSearchInput}
              />

              <button
                type="button"
                className="search-icon-button"
                onClick={onClickSearchInput}
                testid="searchIcon"
              >
                <FaSearch className="search-icon" />
              </button>
            </li>
            <Link to="/" className="nav-link">
              <li className="nav-menu-item">Home</li>
            </Link>
            <Link to="/my-profile" className="nav-link">
              <li className="nav-menu-item">Profile</li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className={`nav-menu-mobile ${menuToggle ? 'menu-hide' : ''}`}>
        <ul className="nav-menu-list-mobile">
          <Link to="/" className="nav-link nav-menu-item">
            <li className="nav-menu-item-mobile">Home</li>
          </Link>
          <Link to="/" className="nav-link nav-menu-item">
            <li className="nav-menu-item-mobile">Search</li>
          </Link>
          <Link to="/my-profile" className="nav-link nav-menu-item">
            <li className="nav-menu-item-mobile">Profile</li>
          </Link>
          <li className="nav-menu-item-mobile">
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>

          <li className="nav-menu-item-mobile">
            <button type="button" className="nav-mobile-btn">
              <img
                src="https://res.cloudinary.com/visvarma/image/upload/v1644585177/InstaShare%20%28Instagram-Clone%29/Solid_xqz8in.png"
                alt="nav hamburger"
                className="nav-bar-menu-image"
                onClick={onCloseMenu}
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
