import {Component} from 'react'

import Header from '../header'

import EachSong from '../eachsong'

import './index.css'

class PlayListItem extends Component {
  state = {playlist: {}, tracksList: [], playedSong: {}}

  componentDidMount() {
    this.getPlaylists()
  }

  getTime = millis => {
    const minutes = Math.floor(millis / 60000)
    const seconds = ((millis % 60000) / 1000).toFixed(0)

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  getPlaylists = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = localStorage.getItem('pa_token', '')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      `https://api.spotify.com/v1/users/spotify/playlists/${id}`,
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const specificObj = {
        imageUrl: data.images[0].url,
        artist: data.description.split(':')[1],
        text: 'editors pick',
        description: data.name,
      }
      console.log(specificObj)
      const {tracks} = data
      const {items} = tracks
      console.log(items)
      const songsData = items.map(eachItem => ({
        added: eachItem.added_at,
        song: eachItem.track.name,
        link: eachItem.id,
        duration: this.getTime(eachItem.track.duration_ms),
        album: eachItem.track.album.name,
        artist: eachItem.track.artists[0].name,
      }))
      this.setState({playlist: specificObj, tracksList: songsData})
    }
  }

  playSong1 = obj => {
    this.setState({playedSong: obj})
  }

  render() {
    const {playlist, tracksList, playedSong} = this.state
    console.log(playedSong)
    const {song, artist} = playedSong
    return (
      <div className="main-container">
        <Header />
        <div className="app-container2">
          <div className="back-container">
            <img
              src="https://res.cloudinary.com/dsreom2uh/image/upload/v1626088799/arrow_back_ppwmgq.png"
              className="back-arrow"
              alt="avatar"
            />
            <p className="para">Back</p>
          </div>
          <div className="playlist-container">
            <img
              src={playlist.imageUrl}
              className="playlist-image"
              alt="avatar"
            />
            <div className="playlist-details-container">
              <h1 className="description">{playlist.description}</h1>
              <p className="artist">{playlist.artist}</p>
            </div>
          </div>
          <ul className="songs-container1">
            {tracksList.map(eachItem => (
              <EachSong
                eachSong={eachItem}
                key={eachItem.id}
                playSong={this.playSong1}
              />
            ))}
          </ul>
          <hr className="line" />
          <div className="black">
            <img
              src={playlist.imageUrl}
              alt="avatar"
              className="player-image"
            />
            <div className="artist-container1">
              <p className="para2">{song}</p>
              <p className="para3">{artist}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PlayListItem
