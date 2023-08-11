import { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { deleteScore, getUserScore } from "../supabase/querys"

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

  async function handleDelete(id) {
    console.log('1')
    await deleteScore(id)
    console.log('2')
    setUserScore(userScore.filter(u => u.id !== id))
    console.log('3')
  }

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
                <td><button onClick={() => handleDelete(score.id)}>delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
