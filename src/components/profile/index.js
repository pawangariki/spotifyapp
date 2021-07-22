import {Component} from 'react'

import Header from '../header'

import './index.css'

class Profile extends Component {
  state = {resultData1: {}, isLoading: true}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const token = localStorage.getItem('pa_token', '')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://api.spotify.com/v1/me', options)
    if (response.ok === true) {
      const data = await response.json()
      const data1 = {
        name: data.display_name,
        followers: data.followers.total,
      }
      this.setState({resultData1: data1, isLoading: false})
    }
  }

  logout = () => {
    const {history} = this.props
    localStorage.removeItem('pa_token')
    history.replace('/login')
  }

  getProfile1 = () => {
    const {resultData1} = this.state

    const {name, followers} = resultData1
    return (
      <div className="content-container1">
        <img
          src="https://res.cloudinary.com/dsreom2uh/image/upload/v1625907385/Group_1_odv6a2.png"
          alt="avatar"
          className="profile-pic"
        />
        <h1 className="username">{name}</h1>
        <div className="content-container2">
          <div className="followers-container">
            <p className="followers-num">{followers}</p>
            <p className="followers-text">FOLLOWERS</p>
          </div>
          <div className="playlists-container">
            <p className="followers-num">0</p>
            <p className="followers-text">PLAYLISTS</p>
          </div>
        </div>
        <div className="button-container">
          <button type="button" onClick={this.logout} className="button">
            LOGOUT
          </button>
        </div>
      </div>
    )
  }

  getLoader = () => (
    <div className="loader-container">
      <div className="content-container">
        <img
          src="https://res.cloudinary.com/do4qwwms8/image/upload/v1625029477/Spotify%20Clone/music_sjt9vm.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <h1 className="loader">Loading...</h1>
      </div>
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="main-container">
        <Header />
        <div className="app-container">
          {isLoading ? this.getLoader() : this.getProfile1()}
        </div>
      </div>
    )
  }
}
export default Profile
