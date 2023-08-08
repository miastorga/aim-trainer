import { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { getUserScore } from "../supabase/querys"

export const TimeRecords = () => {
  const { user } = UserAuth()
  const [userScore, setUserScore] = useState([])


  useEffect(() => {
    async function getScore() {
      if (user) {
        const score = await getUserScore({ userId: user.id })
        console.log('get new score')
        setUserScore(score.data)
      }
    }
    getScore()
  }, [user])

  return (
    <div style={{ height: '100vh', backgroundColor: '#8A2BE2' }}>
      <div style={{ textAlign: 'center', padding: '40px 10px' }}>
        <h1 style={{ color: 'white' }}>Dashboard</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            userScore.map((score, idx) => (
              <tr key={score.id} >
                <td>{idx + 1}</td>
                <td>{score.average_time}ms</td>
                <td>{score.date}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
