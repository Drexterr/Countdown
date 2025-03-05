import { useRef, useState, useEffect } from "react"
import React from 'react'

const App = () => {

  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const handleInput = (e) => {
    setTime(parseInt(e.target.value * 60))
  }
  const format = () => {
    const min = String(Math.floor(time / 60)).padStart(2, '0')
    const sec = String(time % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  const start = () => {
    setIsActive(true);
  }
  const pause = () => {
    setIsPaused(!isPaused);
  }

  const reset = () => {
    clearInterval(intervalRef.current)
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  }
  useEffect(() => {
    if (isActive && !isPaused && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)}
      else if(time===0){
        clearInterval(intervalRef.current);
        setIsActive(false);
      }
      return () => {
clearInterval(intervalRef.current)
      }
},[isActive, isPaused, time])

  return (

    <div className='justify-items-center justify-self-center' >
      <h1 className="font-bold text-3xl py-5 text-purple-800">Countdown Timer</h1>
      <input className='text-center border-2 rounded-2xl px-5' type="number" placeholder='Insert Time in Minutes' onChange={handleInput} />
      <div className="font-bold py-4 text-3xl">{format()}</div>
      <div className="">
        <button className="font-medium p-2 border-2 mx-2 rounded-2xl bg-purple-800 text-white" onClick={start}>Start</button>
        <button className="font-medium p-2 border-2 mx-2 rounded-2xl bg-purple-800 text-white" onClick={pause}>Pause</button>
        <button className="font-medium p-2 border-2 mx-2 rounded-2xl bg-purple-800 text-white" onClick={reset}>reset</button>
      </div>
    </div>
  )
}

export default App
