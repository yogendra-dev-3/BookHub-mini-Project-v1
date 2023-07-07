import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import BookShelves from './components/BookShelves'
import ProtectedRoute from './components/ProtectedRoute'
import BookDetailsRoute from './components/BookDetailsRoute'
import NotFound from './components/NotFound'
import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute path="/bookshelves" component={BookShelves} />
      <ProtectedRoute path="/books/:id" component={BookDetailsRoute} />
      <Route path="/login" component={LoginPage} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
