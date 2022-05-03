import './App.css'
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Blogs } from './Pages/Blogs'
import { Blog } from './Pages/Blog'
import { Home } from './Pages/Home'
import { About } from './Pages/About'
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="title">Junhyun Lim's</div>
          <div className="subtitle">small blog for personal scribbles</div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blogs</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <div className="content">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/blog/:blogId" element={<Blog />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
