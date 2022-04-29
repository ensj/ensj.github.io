import './App.css'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
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
                <NavLink to="/blog">Blog</NavLink>
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
            <Route path="/blog" element={<Blog />} />

            <Route path="/2020/09/06/First-Post" element={<Home />} />
            <Route path="/2020/09/16/Transposes" element={<Home />} />
            <Route path="/2020/09" element={<About />} />
            <Route path="/2020/11/07/Git-Blame" element={<Home />} />
            <Route path="/2020/09" element={<About />} />
            <Route path="/2020" element={<Blog />} />
            <Route path="/2021/07/23" element={<Home />} />
            <Route path="/2021/07" element={<About />} />
            <Route path="/2021" element={<Blog />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
