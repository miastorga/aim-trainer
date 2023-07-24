import { useEffect, useState } from 'react'

function useAverageTime() {
  const [startTime, setStartTime] = useState(0)
  const [clickTimes, setClickTimes] = useState([])
  const [averageTime, setAverageTime] = useState(0)

  useEffect(() => {
    if (clickTimes.length > 1) {
      const sum = clickTimes.reduce((a, b) => a + b, 0)
      const average = sum / clickTimes.length
      setAverageTime(average.toFixed(2))
    }
  }, [clickTimes])

  function handleAverageClick() {
    const currentTime = new Date().getTime()
    if (startTime) {
      const deltaTime = currentTime - startTime
      setClickTimes([...clickTimes, deltaTime])
    }
    setStartTime(currentTime)
  }
  return { startTime, setStartTime, clickTimes, setClickTimes, setAverageTime, averageTime,  }
}
