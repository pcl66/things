import { useRef, useState } from 'react'
import useScroll from './hooks/useScroll'
import useTitle from './hooks/useTitle'
import useUpdate from './hooks/useUpdate'
import Son from './Son'

function App() {
  console.log('渲染了')
  useTitle('小可爱')
  const update = useUpdate()
  const ref = useRef(null)
  const [x, y] = useScroll(ref)
  return (
    <div>
      app
      <button onClick={update}>点我更新组件</button>
      <div
        style={{
          height: '160px',
          width: '160px',
          border: 'solid 1px #000',
          overflow: 'scroll',
          whiteSpace: 'nowrap',
          fontSize: '32px'
        }}
        ref={ref}>
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur atque, debitis ex excepturi explicabo iste iure labore molestiae neque optio perspiciatis</div>
        <div>Aspernatur cupiditate, deleniti id incidunt mollitia omnis! A aspernatur assumenda consequuntur culpa cumque dignissimos enim eos, et fugit natus nemo nesciunt</div>
        <div>Alias aut deserunt expedita, inventore maiores minima officia porro rem. Accusamus ducimus magni modi mollitia nihil nisi provident</div>
        <div>Alias aut autem consequuntur doloremque esse facilis id molestiae neque officia placeat, quia quisquam repellendus reprehenderit.</div>
        <div>Adipisci blanditiis facere nam perspiciatis sit soluta ullam! Architecto aut blanditiis, consectetur corporis cum deserunt distinctio dolore eius est exercitationem</div>
        <div>Ab aliquid asperiores assumenda corporis cumque dolorum expedita</div>
        <div>Culpa cumque eveniet natus totam! Adipisci, animi at commodi delectus distinctio dolore earum, eum expedita facilis</div>
        <div>Quod sit, temporibus! Amet animi fugit officiis perspiciatis, quis unde. Cumque dignissimos distinctio, dolor eaque est fugit nisi non pariatur porro possimus, quas quasi</div>
      </div>
      <h2>
        {x} {y}
      </h2>
      <Son name={'name-son'}>{(data) => <h1>内部{data}</h1>}</Son>
    </div>
  )
}

export default App
