import { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { deleteScore, getFavoriteScore, getUserScore } from "../supabase/querys"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Star } from "./Icons"
import '../App.css'

export const TimeRecords = () => {
  const { user } = UserAuth()
  const [userScore, setUserScore] = useState([])
  const [parent, enableAnimations] = useAutoAnimate({ duration: 300 })


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
    const { data } = await getFavoriteScore(id)
    if (typeof data === 'boolean') {

      let updatedScores = [...userScore].map(score => {
        if (score.id === id) {
          return { ...score, is_favorite: !score.is_favorite }
        }
        return score
      })
      console.log('favorito')

      updatedScores.sort((a, b) => {
        if (a.is_favorite !== b.is_favorite) {
          return b.is_favorite - a.is_favorite
        }
        return new Date(b.date) - new Date(a.date)
      })

      setUserScore(updatedScores)
    }
  }

  return (
    <div style={{
      height: '100vh', backgroundColor: '#8A2BE2', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <div style={{ textAlign: 'center', padding: '40px 10px' }}>
        <h1 style={{ color: 'white', fontSize: '3rem', letterSpacing: '10px' }}>Dashboard</h1>
      </div>
      <div className="table">
        <div className="table-header">
          <div className="table-cell">#</div>
          <div className="table-cell">Score</div>
          <div className="table-cell">Date</div>
          <div className="table-cell"></div>
          <div className="table-cell"></div>
        </div>
        <div className="table-body" ref={parent}>
          {
            userScore.map((score, idx) => (
              <div key={score.id} className="table-row">
                <div className="table-cell">{idx + 1}</div>
                <div className="table-cell">{score.average_time}ms</div>
                <div className="table-cell">{score.date}</div>
                <div className="table-cell">
                  <button onClick={() => handleDelete(score.id)} className="btn-delete">delete</button>
                </div>
                <div className="table-cell">
                  <button style={{ backgroundColor: 'inherit', border: 'none', cursor: 'pointer' }} onClick={() => handleFavorite(score.id)}>
                    <Star width={"30px"} height={"30px"} fill={score.is_favorite ? 'yellow' : 'white'} />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <br />
    </div>
  )
}
