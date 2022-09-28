import React from 'react'
import { GameData, ContainerAll, PlayerActionContainer } from "./PhaseOnePlayerContainer.styles"

const PhaseOnePlayerContainer = (props) => {
  return (
    <>
      <ContainerAll>
        <GameData>
          <ul>Wörterliste
            {
              props.wordArray.words.map((word) => <li key={word}>{word}</li> )
            }
          </ul>
          <div>
            <div>Runde: {props.round}</div>
            <div>Letter: {props.letter}   
              <img 
                src={props.randomizeIcon}
                alt="randomize Icon"
                onClick={props.randomizeLetterHandler}
                width="15px"
              />
            </div>
            <div>Time:{props.counter} s</div>
            <button onClick={props.startRound}>Start Round</button>
          </div>
        </GameData>
        <PlayerActionContainer>
          <input 
            type="text"
            placeholder="Type your word"
            value={props.playerWord}
            onChange={(event) => props.setPlayerWord(event.target.value)}
            onKeyDown={(event) => {
              if(event.key==="Enter") {
                props.submitHandler()
              }
            }}
            />
          <button onClick={props.submitHandler}>Submit</button>
        </PlayerActionContainer>
      </ContainerAll>
    </>  
  )
}

export default PhaseOnePlayerContainer