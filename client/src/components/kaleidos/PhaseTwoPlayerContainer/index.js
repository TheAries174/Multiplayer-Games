import React from 'react'
import { PlayerAndWordContainer, ContainerAll, NextRoundBtn } from "./PhaseTwoPlayerContainer.styles"

const PhaseTwoPlayerContainer = (props) => {
  return (
    <ContainerAll>
      <PlayerAndWordContainer playerNumber={props.users.length}>
        <NextRoundBtn onClick={props.nextRoundHandler} >Next Round</NextRoundBtn>
        {
          props.userData.map((obj) => {
            return(
              <details 
                open={obj.open} 
                onToggle={(event) => props.toggleHandler(event)}
                id={obj.userName}
              >
                <summary><u>{obj.userName}</u></summary>
                <ul>
                  {obj.words.map((word) => 
                    <li 
                      onClick={(event) => props.wordClickHandler(event)}
                      id={obj.userName}
                      key={word}
                    >{word}
                    </li>
                  )}
                </ul>
              </details>
            )
          })
        }
        <div>score</div>
        {
          props.userData.map((obj) => {
            return(
              <div>{obj.open ? obj.score : "***"}</div>
            ) 
          })
        }
      </PlayerAndWordContainer>
    </ContainerAll>
  )
}

export default PhaseTwoPlayerContainer