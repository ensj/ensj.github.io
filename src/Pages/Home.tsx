import { useRef } from 'react'
import VoronoiStippling from '../components/VoronoiStippling'
// import useResize from '../hooks/useResize'

export function Home() {
  const ref = useRef<HTMLDivElement>(null)
  // const { width, height } = useResize(ref)

  return (
    <div ref={ref}>
      <h2>Home</h2>
      <VoronoiStippling />
    </div>
  )
}
