import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"




const Blog = ({ blog }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }




  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} </Link> {blog.author}
      <ul>
        <li>Likes: {blog.likes} <Button bsStyle="btn-sm btn-success">Give +1 </Button></li>
        <li><a href={blog.url}>{blog.url}</a></li>
      </ul>
    </div>

  )


}



export default Blog