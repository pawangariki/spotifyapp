const EachSong = props => {
  const {eachSong, playSong} = props
  const {song, artist, duration} = eachSong
  const selectSong = () => {
    playSong(eachSong)
  }
  return (
    <li className="each-song" onClick={selectSong}>
      <div className="artist-container">
        <p className="song1">{song}</p>
        <p className="artist1">{artist}</p>
      </div>
      <div className="duration-container">
        <p className="duration">{duration}</p>
      </div>
    </li>
  )
}
export default EachSong
