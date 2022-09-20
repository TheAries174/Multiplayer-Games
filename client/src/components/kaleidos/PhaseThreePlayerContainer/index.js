import React from 'react'
import { ContainerAll } from './PhaseThreePlayerContainer.styles'

const PhaseThreePlayerContainer = (props) => {
  return (
    <ContainerAll>
      <div><u>Platz</u></div>
      <div><u>Spieler</u></div>
      <div><u>Score</u></div>
      {
        props.allScores.map((obj, index) => {
          return(
            <>
              <div>{index+1}.</div>  
              <div>{obj.userName}</div>
              <div>{obj.score} Punkte</div>
            </>
          )
        })
      }
    </ContainerAll>
  )
}

export default PhaseThreePlayerContainer