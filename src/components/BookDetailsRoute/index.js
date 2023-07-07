import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiTwotoneStar,
} from 'react-icons/ai'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const BookDetailsRoute = props => {
  const [bookDetails, setBookDetails] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const {match} = props
    const {params} = match
    const {id} = params

    setApiStatus(apiStatusConstants.inProgress)

    const getBookDetails = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/book-hub/books/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(url, options)
      const data = await response.json()
      const book = data.book_details
      if (response.ok) {
        const updatedData = {
          aboutAuthor: book.about_author,
          aboutBook: book.about_book,
          authorName: book.author_name,
          coverPic: book.cover_pic,
          id: book.id,
          rating: book.rating,
          readStatus: book.read_status,
          title: book.title,
        }

        setBookDetails(prevDetails => [...prevDetails, updatedData])
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getBookDetails()
  }, [props])

  const renderLoadingView = () => (
    <div className="books-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <>
      <div className="failure-view-container-lg">
        <div className="failure-card">
          <img
            src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688140585/Group_7522_4_pklns2.jpg"
            alt="failure view"
            className="failure-image"
          />
          <p className="failure-text">
            Something went wrong, Please try again.
          </p>
          <button type="button" className="failure-button">
            Try Again
          </button>
        </div>
      </div>

      <div className="failure-view-container-sm">
        <div className="failure-card-sm">
          <img
            src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688141223/Group_7522_5_abtwaf.jpg"
            alt="failure view"
            className="failure-image-sm"
          />
          <p className="failure-text-sm">
            Something went wrong, Please try again.
          </p>
          <button type="button" className="failure-button-sm">
            Try Again
          </button>
        </div>
      </div>
    </>
  )
  const showDetails = bookDetails.length === 1

  const renderSuccessView = () => (
    <>
      <div className="small">
        {showDetails ? (
          <>
            <div>
              <img
                src={bookDetails[0].coverPic}
                alt={bookDetails[0].title}
                className="cover-pic-sm"
              />
              <div className="book-about">
                <h1 className="book-title">{bookDetails[0].title}</h1>
                <p className="author-name">{bookDetails[0].authorName}</p>
                <div className="book-rating-container">
                  <p className="book-rating-text">Avg Rating</p>
                  <AiTwotoneStar className="rating-star" />
                  <p className="book-rating">{bookDetails[0].rating}</p>
                </div>
                <div className="status-container">
                  <p className="book-status-text">Status : </p>
                  <p className="book-details-status">
                    {bookDetails[0].readStatus}
                  </p>
                </div>
              </div>
              <hr className="horizontal" />
              <p className="about-author">About Author</p>
              <p className="author-about">{bookDetails[0].aboutAuthor}</p>
              <p className="about-author">About Book</p>
              <p className="author-about">{bookDetails[0].aboutBook}</p>
            </div>
            <div className="footer-container">
              <div className="icons-container">
                <AiOutlineGoogle className="footer-icon" />
                <AiOutlineTwitter className="footer-icon" />
                <AiOutlineInstagram className="footer-icon" />
                <AiOutlineYoutube className="footer-icon" />
              </div>
              <p className="contact-us">Contact Us</p>
            </div>
          </>
        ) : (
          <div className="books-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )}
      </div>

      <div className="large">
        {showDetails ? (
          <>
            <div className="details-card">
              <div className="image-container">
                <img
                  src={bookDetails[0].coverPic}
                  alt={bookDetails[0].title}
                  className="cover-pic-lg"
                />
                <div className="book-about-lg">
                  <h1 className="book-title-lg">{bookDetails[0].title}</h1>
                  <p className="author-name-lg">{bookDetails[0].authorName}</p>
                  <div className="book-rating-container-lg">
                    <p className="book-rating-text-lg">Avg Rating</p>
                    <AiTwotoneStar className="rating-star-lg" />
                    <p className="book-rating-lg">{bookDetails[0].rating}</p>
                  </div>
                  <div className="status-container-lg">
                    <p className="book-status-text-lg">Status : </p>
                    <p className="book-details-status-lg">
                      {bookDetails[0].readStatus}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="horizontal" />
              <p className="about-author-lg">About Author</p>
              <p className="author-about-lg">{bookDetails[0].aboutAuthor}</p>
              <p className="about-author-lg">About Book</p>
              <p className="author-about-lg">{bookDetails[0].aboutBook}</p>
            </div>

            <div className="footer-container">
              <div className="icons-container">
                <AiOutlineGoogle className="footer-icon" />
                <AiOutlineTwitter className="footer-icon" />
                <AiOutlineInstagram className="footer-icon" />
                <AiOutlineYoutube className="footer-icon" />
              </div>
              <p className="contact-us">Contact Us</p>
            </div>
          </>
        ) : (
          <div className="books-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )}
      </div>
    </>
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

  return (
    <>
      <div className="book-details-container-sm">
        <Header />
        {renderFinalView()}
      </div>

      <div className="book-details-container-lg">
        <Header />
        {renderFinalView()}
      </div>
    </>
  )
}

export default BookDetailsRoute
