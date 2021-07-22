import {Component} from 'react'

import {Link, NavLink} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {
    isClicked: false,
  }

  clickMenu = () => this.setState({isClicked: true})

  getMix = () => this.setState({isClicked: false})

  getMenu = () => (
    <div className="icon-container">
      <img
        src="https://res.cloudinary.com/do4qwwms8/image/upload/v1625029477/Spotify%20Clone/music_sjt9vm.png"
        className="mix"
        alt="website logo"
      />
      <div className="icons-container">
        <img
          src="https://res.cloudinary.com/dsreom2uh/image/upload/v1626583772/menu_qxts8g.png"
          className="menu"
          alt="menu"
          onClick={this.clickMenu}
        />
      </div>
    </div>
  )

  getIcons = () => (
    <ul className="icon-container1">
      <Link to="/profile" className="nav-items">
        <li className="icons-container">
          <img
            src="https://res.cloudinary.com/dsreom2uh/image/upload/v1625813809/persondsd_mliejt.png"
            className="icon"
            alt="icon"
          />
        </li>
      </Link>
      <Link to="/" className="nav-items">
        <li className="icons-container">
          <img
            src="https://res.cloudinary.com/dsreom2uh/image/upload/v1625976647/home_e8w02l.png"
            className="icon"
            alt="icon"
          />
        </li>
      </Link>

      <Link to="/music" className="nav-items">
        <li className="icons-container">
          <img
            src="https://res.cloudinary.com/dsreom2uh/image/upload/v1625902534/Solid_12_dg9swf.png"
            className="icon"
            alt="icon"
          />
        </li>
      </Link>
      <Link to="/playlists" className="nav-items">
        <li className="icons-container">
          <img
            src="https://res.cloudinary.com/dsreom2uh/image/upload/v1625813573/queue_music_black_24dp_1_ls2wqn.png"
            className="icon"
            alt="icon"
          />
        </li>
      </Link>
      <li className="icons-container">
        <img
          src="https://res.cloudinary.com/dsreom2uh/image/upload/v1626586043/close_wghqtz.png"
          className="icon nav-items"
          alt="icon"
          onClick={this.getMix}
        />
      </li>
    </ul>
  )

  render() {
    const {isClicked} = this.state

    return (
      <div className="side-nav-bar">
        <div className="mobile-header">
          {isClicked ? this.getIcons() : this.getMenu()}
        </div>

        <img
          src="https://res.cloudinary.com/do4qwwms8/image/upload/v1625029477/Spotify%20Clone/music_sjt9vm.png"
          className="mix1"
          alt="website logo"
        />
        <ul className="laptop-container">
          <NavLink
            exact
            to="/profile"
            className="nav-items1"
            activeClassName="container2"
          >
            <li className="container1">
              <img
                src="https://res.cloudinary.com/dsreom2uh/image/upload/v1625813809/persondsd_mliejt.png"
                className="icon"
                alt="icon"
              />
              <p className="para">Profile</p>
            </li>
          </NavLink>
          <NavLink
            exact
            to="/"
            className="nav-items1"
            activeClassName="container2"
          >
            <li className="container1">
              <img
                src="https://res.cloudinary.com/dsreom2uh/image/upload/v1625976647/home_e8w02l.png"
                alt="icon"
                className="icon"
              />
              <p className="para">Home</p>
            </li>
          </NavLink>

          <NavLink
            exact
            to="/music"
            className="nav-items1"
            activeClassName="container2"
          >
            <li className="container1">
              <img
                src="https://res.cloudinary.com/dsreom2uh/image/upload/v1625902534/Solid_12_dg9swf.png"
                className="icon"
                alt="icon"
              />
              <p className="para">YourMusic</p>
            </li>
          </NavLink>
          <NavLink
            exact
            to="/playlists"
            className="nav-items1"
            activeClassName="container2"
          >
            <li className="container1" onClick={this.clickPlay}>
              <img
                src="https://res.cloudinary.com/dsreom2uh/image/upload/v1625813573/queue_music_black_24dp_1_ls2wqn.png"
                className="icon"
                alt="icon"
              />
              <p className="para">Playlists</p>
            </li>
          </NavLink>
        </ul>
      </div>
    )
  }
}

export default Header
