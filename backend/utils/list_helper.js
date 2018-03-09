const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    let sum = 0;
    blogs.forEach(blog => {
      sum = sum + blog.likes

    });
    return sum;
  }
}

const favoriteBlog = (blogs) => {
  let max = 0;
  let bestBlog = null;
  blogs.forEach(blog => {
    if (blog.likes >= max) {
      max = blog.likes;
      bestBlog = blog;
    }
  });
  return bestBlog;

}

const mostBlogs = (blogs) => {


  let currentBestAuthor = ""
  let currentBestScore = 0
  let tempCounter = 0

  blogs.forEach(blog => {
    let currentAuthor = blog.author
    blogs.forEach(blog => { //Käydään blogit läpi ja lasketaan jokaiselle authorille score erikseen
      if (blog.author === currentAuthor) {
        tempCounter++
      }
    })
    if (tempCounter >= currentBestScore) {
      currentBestScore = tempCounter
      currentBestAuthor = currentAuthor

    }
    tempCounter = 0
  });

  results = {
    author: currentBestAuthor,
    blogs: currentBestScore
  }

  return results


}

const mostLikes = (blogs) => {


  let bestAuthor = ""
  let bestLikes = 0
  let tempCounter = 0

  blogs.forEach(blog => {
    let currentAuthor = blog.author

    blogs.forEach(blog => { //Käydään blogit läpi ja lasketaan jokaiselle authorille score erikseen
      if (blog.author === currentAuthor) {
        tempCounter = tempCounter + blog.likes
      }
    })
    if (tempCounter >= bestLikes) {
      bestLikes = tempCounter
      bestAuthor = currentAuthor

    }
    tempCounter = 0
  });

  results = {
    author: bestAuthor,
    likes: bestLikes
  }

  return results


}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}