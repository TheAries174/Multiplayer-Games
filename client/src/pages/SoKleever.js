import React from 'react';
import PregameLobby from "../components/PregameLobby"
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../socket";

const SoKleever = () => {
  const socket = React.useContext(SocketContext); 
  const navigate = useNavigate()
  
  const createRoom = () => {
    let userName = window.prompt("Please enter your username!")
    navigate("/games/so-kleever/createRoom")
    socket.emit("createRoom", {
      userName: userName, 
      gameId: makeId(4)
    })
  }
  const joinRoom = () => {
    navigate("/games/so-kleever/joinRoom")
  }

  function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }

  const description = <div>
  <strong>So Kleever</strong> is a cooperative word-association game. 
  Play as a team to get the highest score. Get Keywords and secretly write their common features
  on your Clover board; these are your Clues. Then work together to try to figure out each player’s 
  Keywords.
  </div>

    return (
      <PregameLobby 
        createRoom={createRoom}
        joinRoom={joinRoom}
        description={description}
      />
    )
}

export default SoKleever