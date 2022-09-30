import React from 'react'
import { ContainerAll, GameCodeContainer, CopyLogoImg, GameCodeNumber, GameCodeText, GameCode, GameCodeInstruction, PlayerListContainer, PlayerHeadingContainer, PlayerHeading, PlayerIconImg, RandomizeIcon, PlayerList, SwitchIconBtn, SwitchIconImg, StartContainer, StartBtn} from "./RoomTwoTeam.styles"
import copyLogo from "../../assets/images/copy-logo.svg"
import playerIcon from "../../assets/images/player-icon.png"
import switchIcon from "../../assets/images/switch-icon.png"
import randomizeIcon from "../../assets/images/change-icon.png"

function RoomTwoTeam(props) {
  const team1List = props.team1.map((user) => <li key={user.userId}> {(user.userName === props.currentUser.userName) ? `${user.userName} (You)` : user.userName } </li>)
  const team2List = props.team2.map((user) => <li key={user.userId}> {(user.userName === props.currentUser.userName) ? `${user.userName} (You)` : user.userName } </li>)
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
        <PlayerHeadingContainer>
          <PlayerHeading>
            <PlayerIconImg 
            src={playerIcon} 
            alt="Player Icon"
            />
            <p>Players</p>
          </PlayerHeading>
          <RandomizeIcon 
            src={randomizeIcon}
            alt="randomize-icon"
            onClick={props.randomizeTeams}
          /> 
        </PlayerHeadingContainer>
        <PlayerList>
          <div>
            <u><strong>Team 1</strong></u>
          <ul>
            { (props.team1 !== undefined) ? team1List : "" }
          </ul>
          </div>
          <SwitchIconBtn>
            <SwitchIconImg 
              src={switchIcon} 
              alt="switch-icon"
              onClick={props.changeTeams}
            />
          </SwitchIconBtn>
          <div>
            <u><strong>Team 2</strong></u>
            <ul>
            {props.team2 !== undefined ? team2List : ""}
            </ul>
          </div>
        </PlayerList>
      </PlayerListContainer>
      <StartContainer>
        <p>Wait for other player to join before starting</p>
        <StartBtn onClick={props.startGame}>Start</StartBtn>
      </StartContainer>
    </ContainerAll>
  )
}

export default RoomTwoTeam