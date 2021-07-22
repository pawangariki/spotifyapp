import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/profile'
import Music from './components/music'
import Playlists from './components/playlists'
import PlayListItem from './components/playlistItem'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/music" component={Music} />
      <ProtectedRoute exact path="/playlists" component={Playlists} />
      <ProtectedRoute exact path="/home/:id" component={PlayListItem} />
    </Switch>
  </BrowserRouter>
)

export default App
