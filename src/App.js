import {Route, Switch, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfileRoute from './components/MyProfileRoute'
import NotFound from './components/NotFound'
import './App.css'
import UsersProfileRoute from './components/UsersProfileRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/my-profile" component={MyProfileRoute} />
    <ProtectedRoute exact path="/users/:userId" component={UsersProfileRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
