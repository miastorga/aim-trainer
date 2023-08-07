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
        setUserScore(score.data)
      }
    }
    getScore()
  }, [user])

  return (
    <>
      <div style={{ textAlign: 'center', margin: '10px 10px' }}>
        <h1 style={{ color: 'black' }}>Activity Feed</h1>
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
    </>
  )
}
