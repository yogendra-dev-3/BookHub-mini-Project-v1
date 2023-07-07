import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {RiCloseCircleFill} from 'react-icons/ri'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Header = props => {
  const [isClicked, setClicked] = useState(false)

  const onClickHamburger = () => {
    setClicked(prevState => !prevState)
  }

  const onClickClose = () => {
    setClicked(false)
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const showBar = isClicked ? (
    <div className="header-buttons-sm">
      <Link to="/">
        <button type="button" className="home-button-sm">
          Home
        </button>
      </Link>
      <Link to="/bookshelves">
        <button type="button" className="bookshelves-button-sm">
          Bookshelves
        </button>
      </Link>
      <button
        type="button"
        className="logout-button-sm"
        onClick={onClickLogout}
      >
        Logout
      </button>

      <button type="button" className="close-icon" onClick={onClickClose}>
        <RiCloseCircleFill />
      </button>
    </div>
  ) : null

  return (
    <>
      <nav className="header-container">
        <Link to="/">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dblkpyaej/image/upload/v1687969435/Group_7730_exaa5b.jpg"
              alt="book logo"
              className="book-logo"
            />
            <p className="hub-text">ook Hub</p>
          </div>
        </Link>
        <div className="header-buttons">
          <Link to="/">
            <button type="button" className="home-button">
              Home
            </button>
          </Link>
          <Link to="/bookshelves">
            <button type="button" className="bookshelves-button">
              Bookshelves
            </button>
          </Link>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
        <GiHamburgerMenu
          className="hamburger-menu-icon"
          onClick={onClickHamburger}
        />
      </nav>
      {showBar}
    </>
  )
}

export default withRouter(Header)
