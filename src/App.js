import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfileRoute from './components/MyProfileRoute'
import NotFound from './components/NotFound'
import SearchRoute from './components/SearchRoute'
import './App.css'
import UsersProfileRoute from './components/UsersProfileRoute'
import SearchContext from './Context'

class App extends Component {
  state = {
    searchInput: '',
  }

  changeSearchInput = search => {
    this.setState({searchInput: search})
  }

  render() {
    const {searchInput} = this.state
    return (
      <SearchContext.Provider
        value={{searchInput, changeSearchInput: this.changeSearchInput}}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/my-profile" component={MyProfileRoute} />
          <ProtectedRoute
            exact
            path="/users/:userId"
            component={UsersProfileRoute}
          />
          <ProtectedRoute exact path="/search" component={SearchRoute} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
