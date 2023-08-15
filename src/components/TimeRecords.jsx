import { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { deleteScore, getUserScore } from "../supabase/querys"
import '../App.css'

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
    await deleteScore(id)
    setUserScore(userScore.filter(u => u.id !== id))
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#8A2BE2' }}>
      <div style={{ textAlign: 'center', padding: '40px 10px' }}>
        <h1 style={{ color: 'white', fontSize: '3rem', letterSpacing: '10px' }}>Dashboard</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Score</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            userScore.map((score, idx) => (
              <tr key={score.id} style={{ margin: '40px' }}>
                <td>{idx + 1}</td>
                <td>{score.average_time}ms</td>
                <td>{score.date}</td>
                <td><button onClick={() => handleDelete(score.id)} className="btn-delete">delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <br />
    </div>
  )
}
