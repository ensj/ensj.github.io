import { useRef } from 'react'
import { Link } from 'react-router-dom'
import VoronoiStippling from '../components/VoronoiStippling'
// import useResize from '../hooks/useResize'

export function Home() {
  const ref = useRef<HTMLDivElement>(null)
  // const { width, height } = useResize(ref)

  return (
    <div ref={ref}>
      <h2>Home</h2>
      <VoronoiStippling />
      <div>
        <p>
          This is a Voronoi Stippling diagram I finished recently. There obviously needs to be more work done. Namely, I
          would like to keep the original image invisible before the stippling diagram loads. The canvas also needs to
          resize to fit the content instead of bleeding over like it is doing now.
        </p>
        <p>
          Eventually, I'd like to get some other images to load dynamically depending on the day, and hopefully I can
          get some other cool d3.js visualizations to show up as well. This is all I have for now, though!
        </p>
        <p>
          Much of a code was implemented with the help of{' '}
          <Link to="https://observablehq.com/@mbostock/voronoi-stippling">this article</Link>.
        </p>
      </div>
    </div>
  )
}
