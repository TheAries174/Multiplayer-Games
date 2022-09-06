import React from 'react';
//import { useNavigate } from "react-router-dom";
import GamesOverview from '../components/GamesOverview';

function Games() {
  //const navigate = useNavigate()
  return (
    <GamesOverview></GamesOverview>
/*       GAME
      <div onClick = {() => navigate("/games/uno")} >Uno</div>
      <div onClick = {() => navigate("/games/chameleon")} >Chameleon </div> */
  )
}

export default Games
