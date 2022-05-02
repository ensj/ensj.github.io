import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function VoronoiStippling() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageData, setImageData] = useState<{ width: number; height: number; data: Float64Array | null }>({
    width: 0,
    height: 0,
    data: null,
  })

  useEffect(() => {
    let ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d')

    const image = new Image()
    image.src = process.env.PUBLIC_URL + '/images/junhyun.jpeg'

    image.onload = () => {
      if (!ctx) return

      ctx.canvas.style.width = image.width + 'px'
      ctx.canvas.style.height = image.height + 'px'

      ctx.canvas.width = image.width
      ctx.canvas.height = image.height

      ctx.drawImage(image, 0, 0, image.width, image.height)

      const { data: rgba } = ctx.getImageData(0, 0, image.width, image.height)

      const tempData = new Float64Array(image.width * image.height)

      for (let i = 0, n = rgba.length / 4; i < n; ++i) tempData[i] = Math.max(0, 1 - rgba[i * 4] / 254)

      setImageData({
        width: image.width,
        height: image.height,
        data: tempData,
      })
    }
  }, [])

  useEffect(() => {
    if (!imageData) return

    const { width, height, data } = imageData
    let ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d')

    const n = Math.round((width * height) / 40)

    const worker = new Worker(new URL('./Worker/script.worker.js', import.meta.url))

    function messaged({ data: points }: any) {
      if (!ctx) return
      ctx.fillStyle = '#fcf3e8'
      ctx.fillRect(0, 0, width, height)
      ctx.beginPath()
      for (let i = 0, n = points.length; i < n; i += 2) {
        const x = points[i],
          y = points[i + 1]
        ctx.moveTo(x + 1.5, y)
        ctx.arc(x, y, 1.5, 0, 2 * Math.PI)
      }
      ctx.fillStyle = '#000'
      ctx.fill()
    }

    worker.addEventListener('message', messaged)
    worker.postMessage({ data, width, height, n })
  }, [imageData])

  return (
    <>
      <canvas ref={canvasRef} />
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
          <a href="https://observablehq.com/@mbostock/voronoi-stippling">this article</a>.
        </p>
      </div>
    </>
  )
}
