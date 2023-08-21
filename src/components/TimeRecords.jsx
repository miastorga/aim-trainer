import { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { deleteScore, favoriteScore, getUserScore } from "../supabase/querys"
import '../App.css'
import { Star } from "./Icons"

export const TimeRecords = () => {
  const { user } = UserAuth()
  const [userScore, setUserScore] = useState([])

  console.log(userScore)
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

  async function handleFavorite(id) {
    const { data } = await favoriteScore(id)
    if (typeof data === 'boolean') {
      const updatedScores = userScore.map(score => {
        if (score.id === id) {
          return { ...score, is_favorite: !score.is_favorite }
        }
        return score
      })
      setUserScore(updatedScores)
    }
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#8A2BE2', overflow: 'auto' }}>
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
                <td>
                  <button style={{ backgroundColor: 'inherit', border: 'none', cursor: 'pointer' }} onClick={() => handleFavorite(score.id)}>
                    <Star width={"30px"} height={"30px"} fill={score.is_favorite ? 'yellow' : 'white'} />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <br />
    </div>
  )
}
