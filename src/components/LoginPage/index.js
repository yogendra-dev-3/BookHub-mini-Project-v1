import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const LoginPage = props => {
  const [errorMsg, setErrorMsg] = useState('')
  const [apiStatus, setApiStatus] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const token = Cookies.get('jwt_token')

  if (token !== undefined) {
    return <Redirect to="/" />
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const successfulFetch = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const getJwtToken = async () => {
    const details = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      successfulFetch(data.jwt_token)
      setApiStatus(true)
    } else {
      setApiStatus(false)
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <>
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dblkpyaej/image/upload/v1687969157/Ellipse_99_mclbyp.jpg"
          alt="login"
          className="login-image"
        />
        <div className="group">
          <img
            src="https://res.cloudinary.com/dblkpyaej/image/upload/v1687969435/Group_7730_exaa5b.jpg"
            alt="group"
            className="group-image"
          />
          <p className="group-text">ook Hub</p>
        </div>

        <div className="card-container">
          <div className="input-container">
            <p className="username-label">Username*</p>
            <input
              className="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="input-container">
            <p className="username-label">Password*</p>
            <input
              className="username"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {!apiStatus && <p className="error-msg">{errorMsg}</p>}
          <button type="button" onClick={getJwtToken} className="login-button">
            Login
          </button>
        </div>
      </div>

      <div className="login-container-lg">
        <img
          src="https://res.cloudinary.com/dblkpyaej/image/upload/v1687972873/Rectangle_1467_fj0sjq.jpg"
          alt="login"
          className="login-image-lg"
        />
        <div className="login-card">
          <div className="group-lg">
            <img
              src="https://res.cloudinary.com/dblkpyaej/image/upload/v1687969435/Group_7730_exaa5b.jpg"
              alt="group"
              className="group-image"
            />
            <p className="group-text">ook Hub</p>
          </div>

          <div className="card-container">
            <div className="input-container">
              <p className="username-label">Username*</p>
              <input
                className="username"
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <div className="input-container">
              <p className="username-label">Password*</p>
              <input
                className="username"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            {!apiStatus && <p className="error-msg">{errorMsg}</p>}
            <button
              type="button"
              onClick={getJwtToken}
              className="login-button"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
