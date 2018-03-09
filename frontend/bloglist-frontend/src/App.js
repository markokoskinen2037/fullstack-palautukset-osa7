import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import userService from "./services/users"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: "",
      password: "",
      user: null,
      error: null,
      title: "",
      url: "",
      addBlogVisible: false,
      showDetails: false,
      users: null
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log("login successs!!")

      this.setState({ error: "logged in successfully!" })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }


  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      url: this.state.url,
      author: this.state.author,
    }
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: "",
          url: "",
          author: "",
          error: "added new blog:  " + blogObject.title
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    userService.getAll().then(users =>
      this.setState({ users })
    )





    if (this.state.user === null) {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser') //Jos tämmönen entry on olemassa...
      if (loggedUserJSON) {
        console.log("user data found, you are logged in!")
        const user = JSON.parse(loggedUserJSON)
        this.setState({ user })
        blogService.setToken(user.token)
      } else {
        console.log("user data not found!!!!!!")
      }
    }
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  handleUrlChange = (event) => {
    this.setState({ url: event.target.value })
  }

  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value })
  }

  handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogAppUser")
    window.location.reload(false);
  }


  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const error = () => {
      if (this.state.error !== null) {
        return (
          <div>
            <p>{this.state.error}</p>
          </div>
        )
      }
    }





    const blogForm = () => {

      const hideWhenVisible = { display: this.state.addBlogVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.addBlogVisible ? '' : 'none' }


      if (this.state.user !== null) {

        return (
          <div>
            <div style={hideWhenVisible}>
              <button onClick={e => this.setState({ addBlogVisible: true })}>Add a new blog</button>
            </div>

            <div style={showWhenVisible}>


              <h2>Luo uusi blogi</h2>

              <form onSubmit={this.addBlog}>
                Title:
              <input
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                />
                URL:
                <input
                  value={this.state.url}
                  onChange={this.handleUrlChange}
                />
                Author:
              <input
                  value={this.state.author}
                  onChange={this.handleAuthorChange}
                />
                <button type="submit">tallenna</button>
                <button onClick={e => this.setState({ addBlogVisible: false })}>Cancel addition</button>
              </form>





            </div>

          </div>
        )
      }
      return null;
    }

    function toggleDetails() {
      console.log("here i am")
      if (this.state.showDetails === true) {
        this.setState({ showDetails: false })
      } else {
        this.setState({ showDetails: true })
      }
    }

    const blogs = () => {
      let user = null;
      let blogit = this.state.blogs

      blogit.sort(function (a, b) {
        return b.likes - a.likes;
      });


      if (this.state.user === null) {
        return (<p>waiting for user to login...</p>)
      }


      if (this.state.user !== null) {
        return (
          <div>
            <h2>blogs</h2>

            {blogit.map(blog =>
              <p onClick={e => this.setState({ showDetails: true })}><Blog showDetails={this.state.showDetails} key={blog._id} blog={blog} /></p>
            )}
          </div>

        )
      }
      return null;
    }

    const users = () => {

      if (this.state.users !== null) {
        return (
          <div>
            <h2>users</h2>

            <h3>username | blogs</h3>
            {this.state.users.map(user =>
              <div name="content">
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
                | {user.blogs.length}
              </div>
            )}


          </div>


        )
      }
      return null;
    }

    const navBar = () => {
      return (
        <div style={{ borderStyle: "solid" }} name="navBar">
          <div name="content">
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/blogs">Blogs</Link>
          </div>
        </div>
      )
    }

    const userComponent = ({ match }) => {


      console.log(this.state.users)

      if (this.state.users === null) {
        return (
          <div>
            userdata still loading...
            </div>
        )
      } else {
        let foundUser = null;
        this.state.users.forEach(user => {
          if (match.params.userId === user.id) {
            foundUser = user
          }
        });





        return (
          <div>
            <h2><b>{foundUser.name}</b></h2>
            <h3>blogs created by this user:</h3>
            <ul>

              {foundUser.blogs.map(blog =>
                <Blog showDetails={this.state.showDetails} key={blog._id} blog={blog} />
              )}
              {foundUser.blogs.length === 0 && <p>this user has no blogs yet.</p>}
            </ul>

          </div>
        )
      }


    }

    const blogDetails = ({ match }) => {

      let foundBlog = null;
      if (this.state.blogs === null) {
        return (<p>loading blogs...</p>)
      } else {


        this.state.blogs.forEach(blog => {
          if (blog.id === match.params.blogId) {
            foundBlog = blog
          }
        });
        return (
          <div>
            <h3>{foundBlog.title} by {foundBlog.author}</h3>
            <p>{foundBlog.likes}</p> <button>+1</button>

          </div>

        )

      }


    }

    const userInfoAndLogOutButton = () => {
      if (this.state.user === null) {
        return (<p></p>)
      }
      return (
        <div>
          <div name="userInfoAndLogOutButton">{this.state.user.name} logged in<button onClick={() => this.handleLogout()}>log out</button></div>
        </div>
      )
    }





    return (
      <Router>
        <div>


          {this.state.error !== null && error()}

          <Route path="/" component={navBar} />
          <Route path="/" component={userInfoAndLogOutButton} />
          {this.state.user === null && loginForm()}



          <Route exact={true} path="/" component={blogs} />
          <Route exact={true} path="/" component={blogForm} />


          <Route exact={true} path="/users" component={users} />
          <Route exact={true} path="/users" component={blogForm} />

          <Route path="/users/:userId" component={userComponent} />

          <Route path="/blogs/:blogId" component={blogDetails} />



        </div>
      </Router>
    );
  }
}

export default App;
