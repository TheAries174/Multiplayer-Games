import React from 'react'
import { ContainerAll, GameCodeContainer, CopyLogoImg, GameCodeNumber, GameCodeText, GameCode, GameCodeInstruction, PlayerListContainer, PlayerHeading, PlayerIconImg, PlayerList, SwitchIconBtn, SwitchIconImg, StartContainer, StartBtn} from "./RoomTwoTeam.styles"
import copyLogo from "../../assets/images/copy-logo.svg"
import playerIcon from "../../assets/images/player-icon.png"
import switchIcon from "../../assets/images/switch-icon.png"

function RoomTwoTeam(props) {
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
          <div>
            <u><strong>Team 1</strong></u>
          <ul>
            {props.users.map((user) => <li key={user.userId}> {user.userName} </li>)}
          </ul>
          </div>
          <SwitchIconBtn>
            <SwitchIconImg 
              src={switchIcon} 
              alt="switch-icon"
            />
          </SwitchIconBtn>
          <div>
            <u><strong>Team 2</strong></u>
            <ul>
            </ul>
          </div>
        </PlayerList>
      </PlayerListContainer>
      <StartContainer>
        <p>Wait for other player to join before starting</p>
        <StartBtn>Start</StartBtn>
      </StartContainer>
    </ContainerAll>
  )
}

export default RoomTwoTeam