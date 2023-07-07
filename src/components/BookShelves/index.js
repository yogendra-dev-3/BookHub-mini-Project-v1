import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {
  AiOutlineSearch,
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiTwotoneStar,
} from 'react-icons/ai'
import Header from '../Header'
import CategoryItem from '../CategoryItem'
import CategoryItemSmall from '../CategoryItemSmall'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    booksList: [],
    bookshelfName: 'ALL',
    searchText: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  formatData = each => ({
    id: each.id,
    authorName: each.author_name,
    rating: each.rating,
    readStatus: each.read_status,
    coverPic: each.cover_pic,
    title: each.title,
  })

  onClickTryAgain = () => {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {bookshelfName, searchText} = this.state
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.books.map(each => this.formatData(each))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeCategory = id => {
    const item = bookshelvesList.filter(each => each.id === id)
    const bookStatus = item[0].value

    this.setState({bookshelfName: bookStatus}, this.getBooks)
  }

  changeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getBooks()
  }

  renderFailureView = () => (
    <>
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688064406/Group_7522_zrf5wa.jpg"
          alt="failure"
          className="failure-image-sm"
        />
        <p className="failure-text">Something went wrong. Please try again</p>
        <button
          type="button"
          className="try-again-button"
          onClick={this.onClickTryAgain}
        >
          Try Again
        </button>
      </div>

      <div className="failure-container-lg">
        <img
          src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688064406/Group_7522_zrf5wa.jpg"
          alt="failure"
          className="failure-image-lg"
        />
        <p className="failure-text-lg">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="try-again-button-lg"
          onClick={this.onClickTryAgain}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderLoadingView = () => (
    <div className="books-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {booksList, searchText} = this.state

    return (
      <>
        <div className="book-items">
          {booksList.length > 0 ? (
            booksList.map(each => (
              <li className="book-item-lg" key={each.id}>
                <Link to={`/books/${each.id}`}>
                  <img
                    src={each.coverPic}
                    alt={each.title}
                    className="cover-image"
                  />
                </Link>
                <div className="book-intro">
                  <h1 className="each-title-lg">{each.title}</h1>
                  <p className="book-author">{each.authorName}</p>
                  <div className="rating-container">
                    <p className="rating-text">Avg Rating</p>
                    <AiTwotoneStar className="star" />
                    <p className="rating">{each.rating}</p>
                  </div>
                  <div className="book-status-container">
                    <p className="status-text">Status : </p>
                    <p className="book-status">{each.readStatus}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>
              <img
                src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688093433/Asset_1_1_1_ns3xm9.png"
                alt="no results"
                className="no-results-image-lg"
              />
              <p className="no-results-text-lg">
                Your search for {searchText} did not find any matches.
              </p>
            </>
          )}
        </div>

        <ul className="ul-list">
          {booksList.length > 0 ? (
            booksList.map(each => (
              <li className="book-item" key={each.id}>
                <Link to={`/books/${each.id}`}>
                  <img
                    src={each.coverPic}
                    alt={each.title}
                    className="cover-image"
                  />
                </Link>
                <div className="book-intro">
                  <h1 className="each-title-sm">{each.title}</h1>
                  <p className="book-author">{each.authorName}</p>
                  <div className="rating-container">
                    <p className="rating-text">Avg Rating</p>
                    <AiTwotoneStar className="star" />
                    <p className="rating">{each.rating}</p>
                  </div>
                  <div className="book-status-container">
                    <p className="status-text">Status : </p>
                    <p className="book-status">{each.readStatus}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <>
              <img
                src="https://res.cloudinary.com/dblkpyaej/image/upload/v1688092882/Asset_1_1_xd1c4w.png"
                alt="no results"
                className="no-results-image"
              />
              <p className="no-results-text">
                Your search for {searchText} did not find any matches.
              </p>
            </>
          )}
        </ul>
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
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {bookshelfName, searchText} = this.state
    const bookItem = bookshelvesList.filter(
      each => each.value === bookshelfName,
    )
    const shelfValue = bookItem[0].label

    return (
      <>
        <div className="bookshelves-container">
          <Header />
          <div className="search-container">
            <input
              type="search"
              placeholder="search"
              className="search-input"
              value={searchText}
              onChange={this.changeSearchText}
            />
            <button
              type="button"
              className="search-icon-button"
              onClick={this.onClickSearchIcon}
            >
              <AiOutlineSearch className="search-icon" />
            </button>
          </div>

          <h1 className="bookshelves-heading">Bookshelves</h1>
          <div className="search-buttons-container">
            {bookshelvesList.map(each => (
              <CategoryItemSmall
                details={each}
                key={each.id}
                isActive={each.value === bookshelfName}
                changeCategory={this.changeCategory}
              />
            ))}
          </div>

          <div className="bookshelves-lg-container">
            <div className="bookshelves-category">
              <h1 className="bookshelves-heading-lg">Bookshelves</h1>
              <div className="book-self">
                {bookshelvesList.map(each => (
                  <CategoryItem
                    details={each}
                    key={each.id}
                    isActive={each.value === bookshelfName}
                    changeCategory={this.changeCategory}
                  />
                ))}
              </div>
            </div>
            <div className="big-container">
              <div className="all-books-container">
                <div className="search-header">
                  <h1 className="all-books-heading">
                    {' '}
                    {`${shelfValue} Books`}
                  </h1>
                  <div className="search-container-1">
                    <input
                      type="search"
                      placeholder="search"
                      className="search-input"
                      value={searchText}
                      onChange={this.changeSearchText}
                    />
                    <button
                      type="button"
                      className="search-icon-button"
                      onClick={this.onClickSearchIcon}
                    >
                      <AiOutlineSearch className="search-icon" />
                    </button>
                  </div>
                </div>
              </div>
              {this.renderFinalView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default BookShelves
