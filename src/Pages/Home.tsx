import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Delaunay } from 'd3-delaunay'
import VoronoiStippling from '../components/VoronoiStippling'

export function Home() {
  return (
    <div>
      <h2>Home</h2>
      <VoronoiStippling />
    </div>
  )
}

const Voronoi = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let svg = d3.select(svgRef.current)

    var width = 900,
      height = 600,
      radius = 20

    var vertices = Array.from(poissonDiscSampler(width / 8, height / 8, (width * 7) / 8, (height * 7) / 8, radius))

    const delaunay = Delaunay.from(vertices)
    const voronoi = delaunay.voronoi([0.5, 0.5, width - 0.5, height - 0.5])

    svg.attr('height', '100%').attr('width', '100%').attr('viewBox', [0, 0, width, height])

    svg
      .append('path')
      .attr('fill', '#a81720')
      .attr('stroke', '#a81720')
      .attr('stroke-width', 1)
      .attr('d', voronoi.render())
  }, [])

  return <svg ref={svgRef} />
}

function* poissonDiscSampler(x0: number, y0: number, x1: number, y1: number, radius: number) {
  const k = 30 // maximum number of samples before rejection
  const width = x1 - x0
  const height = y1 - y0
  const radius2 = radius * radius
  const radius2_3 = 3 * radius2
  const cellSize = radius * Math.SQRT1_2
  const gridWidth = Math.ceil(width / cellSize)
  const gridHeight = Math.ceil(height / cellSize)
  const grid = new Array(gridWidth * gridHeight)
  const queue: number[][] = []

  // Pick the first sample.
  yield sample(width / 2 + Math.random() * radius, height / 2 + Math.random() * radius)

  // Pick a random existing sample from the queue.
  pick: while (queue.length) {
    const i: number = (Math.random() * queue.length) | 0
    const parent = queue[i]

    // Make a new candidate between [radius, 2 * radius] from the existing sample.
    for (let j = 0; j < k; ++j) {
      const a = 2 * Math.PI * Math.random()
      const r = Math.sqrt(Math.random() * radius2_3 + radius2)
      const x = parent[0] + r * Math.cos(a)
      const y = parent[1] + r * Math.sin(a)

      // Accept candidates that are inside the allowed extent
      // and farther than 2 * radius to all existing samples.
      if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
        yield sample(x, y)
        continue pick
      }
    }

    // If none of k candidates were accepted, remove it from the queue.
    const r = queue.pop()
    if (i < queue.length) queue[i] = r as number[]
  }

  function far(x: number, y: number) {
    const i = (x / cellSize) | 0
    const j = (y / cellSize) | 0
    const i0 = Math.max(i - 2, 0)
    const j0 = Math.max(j - 2, 0)
    const i1 = Math.min(i + 3, gridWidth)
    const j1 = Math.min(j + 3, gridHeight)
    for (let j = j0; j < j1; ++j) {
      const o = j * gridWidth
      for (let i = i0; i < i1; ++i) {
        const s = grid[o + i]
        if (s) {
          const dx = s[0] - x
          const dy = s[1] - y
          if (dx * dx + dy * dy < radius2) return false
        }
      }
    }
    return true
  }

  function sample(x: number, y: number, parent?: any) {
    queue.push((grid[gridWidth * ((y / cellSize) | 0) + ((x / cellSize) | 0)] = [x, y]))
    return [x + x0, y + y0]
  }
}
