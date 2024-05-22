import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    errorOccured: false,
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassWord = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFail = errorMsg => {
    this.setState({errorMsg, errorOccured: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFail(data.error_msg)
    }
  }

  render() {
    const {username, password, errorOccured, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <div className="form-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <label className="form-label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            className="form-input"
            type="text"
            placeholder="username"
            value={username}
            id="username"
            onChange={this.onChangeUserName}
          />
          <br />
          <br />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="form-input"
            type="password"
            value={password}
            id="password"
            placeholder="password"
            onChange={this.onChangePassWord}
          />
          <br />
          <br />
          <br />
          <button className="form-submit-button" type="submit">
            Login
          </button>
          {errorOccured && <p className="err">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
