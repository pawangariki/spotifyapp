import {Component} from 'react'

import {Link} from 'react-router-dom'

import moment from 'moment'

import Header from '../header'

import './index.css'

class SpotifyClone extends Component {
  state = {
    editorsData: [],
    category1Data: [],
    releaseData1: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getHomePage()
  }

  getHomePage = async () => {
    const token = localStorage.getItem('pa_token', '')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    const response = await fetch('https://api.spotify.com/v1/me', options)
    if (response.ok === true) {
      const data = await response.json()
      const {country} = data
      const response1 = await fetch(
        `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timestamp}`,
        options,
      )
      if (response1.ok === true) {
        const data1 = await response1.json()
        console.log(data1)
        const {playlists} = data1
        const {items} = playlists
        console.log(items)
        const resultData = items.map(eachItem => ({
          imageUrl: eachItem.images[0].url,
          name: eachItem.name,
          id: eachItem.id,
        }))
        this.setState({editorsData: resultData})
      }
      const response2 = await fetch(
        'https://api.spotify.com/v1/browse/categories',
        options,
      )
      if (response2.ok === true) {
        const data2 = await response2.json()

        const {categories} = data2
        const {items} = categories
        const categoryData = items.map(eachItem => ({
          id: eachItem.id,
          imageUrl: eachItem.icons[0].url,
          name: eachItem.name,
        }))

        this.setState({category1Data: categoryData})
      }
      const response3 = await fetch(
        `https://api.spotify.com/v1/browse/new-releases?country=${country}`,
        options,
      )
      console.log(response)
      if (response3.ok === true) {
        const data3 = await response3.json()
        const {albums} = data3
        const {items} = albums
        const releaseData = items.map(eachItem => ({
          name: eachItem.name,
          id: eachItem.id,
          imageUrl: eachItem.images[0].url,
        }))
        this.setState({releaseData1: releaseData, isLoading: false})
      }
    }
  }

  getHome = () => {
    const {editorsData, category1Data, releaseData1} = this.state
    return (
      <div className="app-container1">
        <h1 className="editor">Editors pick</h1>
        <ul className="editors-container">
          {editorsData.map(eachItem => (
            <Link to={`/home/${eachItem.id}`} className="nav-items">
              <li className="each-card" id={eachItem.id}>
                <img
                  src={eachItem.imageUrl}
                  className="editors-image"
                  alt="avatar"
                />
                <p className="name">{eachItem.name}</p>
              </li>
            </Link>
          ))}
        </ul>
        <h1 className="editor">Genres & Moods</h1>
        <ul className="editors-container">
          {category1Data.map(eachItem => (
            <Link to={`/home/${eachItem.id}`} className="nav-items">
              <li className="each-card" id={eachItem.id}>
                <img
                  src={eachItem.imageUrl}
                  className="editors-image"
                  alt="avatar"
                />
                <p className="name">{eachItem.name}</p>
              </li>
            </Link>
          ))}
        </ul>
        <h1 className="editor">New releases</h1>
        <ul className="editors-container">
          {releaseData1.map(eachItem => (
            <Link to={`/home/${eachItem.id}`} className="nav-items">
              <li className="each-card" id={eachItem.id}>
                <img
                  src={eachItem.imageUrl}
                  className="editors-image"
                  alt="avatar"
                />
                <p className="name">{eachItem.name}</p>
              </li>
            </Link>
          ))}
        </ul>
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
        {isLoading ? this.getLoader() : this.getHome()}
      </div>
    )
  }
}

export default SpotifyClone
