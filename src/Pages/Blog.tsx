import { Link } from 'react-router-dom'

export function Blog() {
  return (
    <div>
      <h2>Blog</h2>
      <div>
        <div>
          Here's a little link to <Link to="/">Home</Link>.
        </div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          Lastly, my final blog, a link to <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  )
}
