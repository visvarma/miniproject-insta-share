import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643820704/insta%20Shere%20clone/erroring_1_1_rn5fz6.jpg"
      alt="page not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-fond-para">
      we are sorry, the page you requested could not be found
    </p>
    <p className="not-fond-para">Please go back to the homepage</p>
    <Link to="/" className="link">
      <button className="n-home-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
