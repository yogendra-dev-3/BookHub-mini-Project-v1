import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from 'react-icons/ai'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const settingsSm = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  const settingsLg = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  const [booksData, setBooksData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const formatBooks = each => ({
    id: each.id,
    authorName: each.author_name,
    coverPic: each.cover_pic,
    title: each.title,
  })

  const getTopRatedBooks = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.books.map(each => formatBooks(each))
      setBooksData(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    setApiStatus(apiStatusConstants.inProgress)

    getTopRatedBooks()
  }, [])

  const onClickTryAgain = () => {
    getTopRatedBooks()
  }

  const renderSuccessView = () => (
    <>
      <div className="slick-container-lg">
        <Slider {...settingsLg}>
          {booksData.map(each => (
            <li className="carousal-item-lg" key={each.id}>
              <img
                className="c-item-image-lg"
                src={each.coverPic}
                alt={each.title}
              />
              <h1 className="c-item-title-lg">{each.title}</h1>
              <p className="c-item-author-name-lg">{each.authorName}</p>
            </li>
          ))}
        </Slider>
      </div>

      <div className="slick-container-sm">
        <Slider {...settingsSm}>
          {booksData.map(each => (
            <li className="carousal-item" key={each.id}>
              <img
                className="c-item-image"
                src={each.coverPic}
                alt={each.title}
              />
              <h1 className="c-item-title">{each.title}</h1>
              <p className="c-item-author-name">{each.authorName}</p>
            </li>
          ))}
        </Slider>
      </div>
    </>
  )

  const renderFailureView = () => (
    <>
      <div className="home-failure-sm">
        <img
          src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688093866/Group_7522_1_fb0tjc.jpg"
          alt="home failure "
          className="home-failure-image"
        />
        <p className="home-failure-text">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="home-failure-button"
          onClick={onClickTryAgain}
        >
          Try Again
        </button>
      </div>

      <div className="home-failure-lg">
        <img
          src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688095679/Group_7522_2_uxxv7s.jpg"
          alt="home failure"
          className="home-failure-image-lg"
        />
        <p className="home-failure-text-lg">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="home-failure-button-lg"
          onClick={onClickTryAgain}
        >
          Try Again
        </button>
      </div>
    </>
  )

  const renderLoadingView = () => (
    <div className="books-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFinalView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  const showFooterSection = apiStatus === 'SUCCESS'

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="content">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <Link to="/bookshelves">
          <button type="button" className="find-books-button">
            Find Books
          </button>
        </Link>

        <div className="slick-sm">
          <h1 className="top-rated">Top Rated Books</h1>
          {renderFinalView()}
        </div>

        <div className="slick-lg">
          <div className="top-books-button">
            <h1 className="top-rated-books">Top Rated Books</h1>
            <Link to="/bookshelves">
              <button type="button" className="find-books-button-lg">
                Find Books
              </button>
            </Link>
          </div>

          {renderFinalView()}
        </div>

        {showFooterSection && (
          <div className="footer-container">
            <div className="icons-container">
              <AiOutlineGoogle className="footer-icon" />
              <AiOutlineTwitter className="footer-icon" />
              <AiOutlineInstagram className="footer-icon" />
              <AiOutlineYoutube className="footer-icon" />
            </div>
            <p className="contact-us">Contact Us</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
