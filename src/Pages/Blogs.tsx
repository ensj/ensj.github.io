import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export interface Blog {
  title: string
  path: string
  filePath: string
  date: string
  categories: string[]
  preview: string
  tags: string[]
}

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/BlogPosts/blogs.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        const unsortedBlogs: Blog[] = myJson.blogs

        unsortedBlogs.sort((blogA, blogB) => {
          return new Date(blogB.date).getTime() - new Date(blogA.date).getTime()
        })

        setBlogs(unsortedBlogs)
      })
  }, [])

  function BlogPreviews() {
    return (
      <div>
        {blogs.map((blog, idx) => (
          <div key={idx}>
            <h3>
              <Link to={blog.path}>{blog.title}</Link>
            </h3>
            <div>Posted {blog.date}</div>
            <ReactMarkdown>{blog.preview}</ReactMarkdown>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2>Blog</h2>
      <BlogPreviews />
    </div>
  )
}
