import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useMatch } from 'react-router-dom'
import { Blog as BlogType } from './Blogs'
import remarkFrontmatter from 'remark-frontmatter'
import remarkExtractFrontmatter from 'remark-extract-frontmatter'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { parse as yaml } from 'yaml'

import 'katex/dist/katex.min.css'

export function Blog() {
  const blogPath = useMatch({ path: '/blog/:blogId', end: true, caseSensitive: true })
  const [blogContent, setBlogContent] = useState<string>('')

  useEffect(() => {
    if (!blogPath) return

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
        const foundBlog: BlogType = myJson.blogs.find((blog: BlogType) => blog.path === blogPath.params.blogId)

        fetch(process.env.PUBLIC_URL + foundBlog.filePath)
          .then((r) => r.text())
          .then((text) => {
            setBlogContent(text)
          })
      })
  }, [blogPath])

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkFrontmatter, [remarkExtractFrontmatter, { yaml: yaml }]]}
        rehypePlugins={[rehypeKatex]}
      >
        {blogContent}
      </ReactMarkdown>
    </div>
  )
}
