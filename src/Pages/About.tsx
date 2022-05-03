import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'
import useResize from '../hooks/useResize'
import { useRef } from 'react'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useResize(ref)

  return (
    <div>
      <h2>About</h2>
      <div style={{ textAlign: 'center' }}>
        <img width={'50%'} src={process.env.PUBLIC_URL + '/images/junhyun.jpeg'} alt="Logo" />
      </div>
      <div>
        <p>
          Hey! My name is Junhyun Lim, as you might have already gathered by the title of this website. I also go by
          nicknames like Jimmy, ensj, or ensjtrans. I've made them mostly for interacting with the rest of the internet,
          but I've also kind of adopted Jimmy as an acceptable name as well :). Feel free to call me whatever from the
          given list!
        </p>
        <p>
          I'm a December 2021 graduate from Santa Clara University, majoring in Computer Science and Mathematics. I have
          a huge passion for pure mathematics, mostly expressed in the form of number theory and abstract algebra. In
          terms of computer science, I've done some research on the use of the Pagerank algorithm and its use in
          attempting to detect plagiarism.
        </p>
        <p>
          In terms of projects I've done, I most recently worked on a graph visualizer project called{' '}
          <a href="https://www.graphvizer.com/">graphvizer</a>. The aim of this web app was to help students get a feel
          for how algorithms might work through an animated visual with custom diagrams!
        </p>
        <p>
          I don't have much to show in terms of my work on mathematics. Here is a{' '}
          <a href="https://arxiv.org/abs/2105.13513">paper</a> that was published with professor Ed Schaefer and my
          friend Shaunak Mashalkar on Fibonacci Pseudoprimes. It was accepted by the Fibonacci Quarterly on May 2021.
        </p>
        <p>
          I've also translated Korean novels to English for 5 years in the past. Most of my work is located at{' '}
          <a href="https://ensjtrans.wordpress.com/">my old blog</a>, but you can also check out my last project in{' '}
          <a href="https://www.wuxiaworld.com/novel/life-once-again">Wuxiaworld</a>.
        </p>

        <p>For a more detailed information on the things I've done, you can take a look at my resume below.</p>
        <div ref={ref}>
          <Document file={process.env.PUBLIC_URL + '/JHL_Resume___April_2022.pdf'}>
            {/* kink: width does not initialize properly. */}
            <Page width={width} pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  )
}
