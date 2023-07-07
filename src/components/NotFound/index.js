import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="notfound-container">
      <div className="page-not-found">
        <img
          src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688117042/Group_7484_gpztkz.jpg"
          alt="not found"
          className="not-found-image"
        />
        <h1 className="not-found-head">Page Not Found</h1>
        <p className="not-found-text">
          we are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </p>
        <Link to="/">
          <button type="button" className="not-found-button">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>

    <div className="notfound-container-lg">
      <div className="page-not-found-lg">
        <img
          src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688118896/Group_7484_1_kmjix6.jpg"
          alt="not found"
          className="not-found-image-lg"
        />
        <h1 className="not-found-head-lg">Page Not Found</h1>
        <p className="not-found-text-lg">
          we are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </p>
        <Link to="/">
          <button type="button" className="not-found-button-lg">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
