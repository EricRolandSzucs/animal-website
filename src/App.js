import Navbar from './Navbar';
import NavbarLower from './NavbarLower';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails.js';
import NotFound from './NotFound';
import Footer from './Footer';
import LoginPage from './LoginPage.js';
import RegisterPage from './RegisterPage.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <NavbarLower />
        <div className="content" style={{ padding: 0 }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage/>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;