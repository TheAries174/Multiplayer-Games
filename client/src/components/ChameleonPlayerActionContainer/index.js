import React from 'react'
import changeIcon from "../../assets/images/change-icon.png"
import { PlayerActionContainer } from "./ChameleonPlayerActionContainer.styles"

const ChameleonPlayerAction = (props) => {
  return (
    <PlayerActionContainer>
      <label htmlFor="wordClue">
        Word Clue
        <input 
          type="text" 
          id="wordClue"
          value={props.wordClue} 
          onChange={(event) => props.setWordClue(event.target.value)}
        />
      </label>
      <label htmlFor="playerReady">
        Ready? 
        <input 
          type="checkbox" 
          id="playerReady"
          value={props.isChecked}
          onChange={props.checkBoxHandler}
        />
      </label>
        <div>
          <label htmlFor="playerVote">
            Vote
            <select
              id="playerVote"
              value={props.playerVote}
              onChange={(event) => props.setPlayerVote(event.target.value)}
            >
              <option value="" defaultValue>--Choose--</option>
              {props.users.map((user) => {
                if (user.userName!==props.currentUser.userName) {
                  return <option value={user.userName} key={user.userId}>{user.userName}</option>
                } else return null
              })}
            </select>
          </label>
          <button onClick={props.voteHandler}>Submit Vote</button>
        </div>
      <div>
        <label htmlFor="winner">
          Who won?
          <select
            id="winner"
            value={props.winner}
            onChange={(event) => props.setWinner(event.target.value)}
          >
            <option>--Choose--</option>
            <option value="team">Team</option>
            <option value="chameleon">Chameleon</option>
          </select>
        </label>  
        <button onClick={props.roundHandler}>Next Round</button>  
      </div>
      <div>
        <p>{`Round ${props.roundNum}`}</p>
        <img src={changeIcon} alt="random-icon" width="20px" style={{display: "inline"}} onClick={props.randomizeHandler}/>
      </div>
    </PlayerActionContainer>
  )
}

export default ChameleonPlayerAction