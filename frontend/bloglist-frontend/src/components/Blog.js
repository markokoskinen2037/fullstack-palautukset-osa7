import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"




const Blog = ({ toggleDetails, showDetails, blog }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }




  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} </Link> {blog.author} 
      <ul>
        <li>Likes: {blog.likes} <button >+1</button></li>
        <li><a href={blog.url}>{blog.url}</a></li>
      </ul>
    </div>

  )


  Blog.PropTypes = {
    toggleDetails: PropTypes.func.isRequired,
    showDetails: PropTypes.bool.isRequired,
    blog: PropTypes.object.isRequired
  }

}



export default Blog