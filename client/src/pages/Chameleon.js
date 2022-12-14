import React from 'react';
import PregameLobby from "../components/PregameLobby"
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../socket";
 
const Chameleon = () => {
  const socket = React.useContext(SocketContext); 
  const navigate = useNavigate()
  
  const createRoom = () => {
    let userName = window.prompt("Please enter your username!")
    navigate("/games/chameleon/createRoom")
    socket.emit("createRoom", {
      userName: userName, 
      gameId: makeId(4)
    })
  }
  const joinRoom = () => {
    navigate("/games/chameleon/joinRoom")
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

  const description = <div><strong>Chameleon</strong> is a bluffing deduction game for everyone.
  Each round involves two missions, depending on whether you’re the Chameleon or not.
  Mission 1: You are the Chameleon. No one knows your identity except you. Your mission is to blend in, not get caught and to work out the Secret Word.
  Mission 2: You are not the Chameleon. Try to work out who the Chameleon is without giving away the Secret Word.
  </div>

    return (
      <PregameLobby 
        createRoom={createRoom}
        joinRoom={joinRoom}
        description={description}
      />
    )
}

export default Chameleon
