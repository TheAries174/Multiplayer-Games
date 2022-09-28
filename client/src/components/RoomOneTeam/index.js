import React from 'react'
import { ContainerAll, GameCodeContainer, CopyLogoImg, GameCodeNumber, GameCodeText, GameCode, GameCodeInstruction, PlayerListContainer, PlayerHeading, PlayerIconImg, PlayerList, StartContainer, StartBtn} from "./RoomOneTeam.styles"
import copyLogo from "../../assets/images/copy-logo.svg"
import playerIcon from "../../assets/images/player-icon.png"


function RoomOneTeam(props) {

  return (
  <ContainerAll>
    <GameCodeContainer>
      <CopyLogoImg 
        src={copyLogo} 
        alt="copy icon" 
        onClick={() =>  navigator.clipboard.writeText(props.gameId)}
      />
      <GameCodeNumber>
        <GameCodeText>Game Code</GameCodeText>
        <GameCode>{props.gameId}</GameCode>
      </GameCodeNumber>
      <GameCodeInstruction>Other players can use this code to join your game.</GameCodeInstruction>
    </GameCodeContainer>
    <PlayerListContainer>
      <PlayerHeading>
        <PlayerIconImg 
          src={playerIcon} 
          alt="Player Icon"
        />
        <p>Players</p>
      </PlayerHeading>
      <PlayerList>
        <ul>
          {props.users.map((user) => <li key={user.userId}> {user.userName} </li>)}
        </ul>
      </PlayerList>
    </PlayerListContainer>
    <StartContainer>
      <p>Wait for other player to join before starting</p>
      <StartBtn onClick={props.startGame}>Start</StartBtn>
    </StartContainer>
  </ContainerAll>
  )
}

export default RoomOneTeam