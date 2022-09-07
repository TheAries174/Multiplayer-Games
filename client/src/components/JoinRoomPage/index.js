import React from 'react'
import { JoinForm, JoinInput, JoinBtn } from "./JoinRoom.styles"

const JoinRoomPage = (props) => {

  return (
    <div>
        <JoinForm>
            <label htmlFor="gameCode">Game Code</label>
            <JoinInput
                type="text" 
                id="gameCode" 
                value={props.gameId} 
                onChange={(event) => props.setGameId(event.target.value)}
                required 
            />
            <label htmlFor="playerName">Player Name</label>
            <JoinInput
                type="text" 
                id="playerName" 
                value={props.playerName}
                onChange={(event) => props.setPlayerName(event.target.value)}
                required
            />
            <JoinBtn onClick={(event) => props.submitData(event)}>Join</JoinBtn>
        </JoinForm>
    </div>
  )
}

export default JoinRoomPage
