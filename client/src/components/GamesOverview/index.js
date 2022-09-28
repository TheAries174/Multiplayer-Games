import React from 'react'
import { ContainerAll, GameContainer, GameCover} from "./GamesOverview.styles" //GameTitle, GameDescription 
import { useNavigate } from "react-router-dom";
import chameleonLogo from "../../assets/images/chameleon-logo.png"
import kaleidosLogo from "../../assets/images/kaleidos-logo.png"
import soKleeverLogo from "../../assets/images/so-kleever-logo.png"

//Functional Component with summary of the game
const GamesCard = (props) => {
  const navigate = useNavigate()
  return(
    <div onClick={() => {navigate(props.URL)}}>
      <GameContainer style={props.style}>
        <GameCover src={props.logo} alt={props.altText}/>
    {/*   <GameTitle>Chameleon</GameTitle>       On hover
          <u>Description</u>
          <GameDescription>
            How well can you blend in and perhaps tell a little white lie? 
            Can you avoid the accusations of your friends and keep your cool as you trying to disguise 
            yourself? <br></br><br></br>
            The Chameleon is a fun game where you'll need to do just that. One player is randomly and 
            secretly selected to be the chameleon. Based on the responses from other players, everyone 
            will have the chance to vote who they think that person is. If you can effetely stay disguised 
            as the chameleon then you'll get a point.
          </GameDescription> */}
      </GameContainer>
    </div>
  )
}

function GamesOverview() {
  return (
    <ContainerAll>
      <GamesCard 
        URL={"/games/chameleon"}
        logo={chameleonLogo}
        altText={"chameleon-logo"}
        style={{backgroundColor: "rgb(115, 188, 118)"}}
      />
      <GamesCard 
        URL={"/games/kaleidos"}
        logo={kaleidosLogo}
        altText={"kaleidos-logo"}
        style={{backgroundColor: "rgb(91, 184, 212)"}}
      />
      <GamesCard
        URL={"/games/so-kleever"}
        logo={soKleeverLogo}
        altText={"so-kleever-logo"}
        style={{backgroundColor: "rgb(154, 202, 60)"}}
      />
      <GameContainer>
        4
      </GameContainer>
    </ContainerAll>
  )
}

export default GamesOverview