import React from 'react';
import PregameLobby from "../components/PregameLobby"
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../socket";

const Kaleidos = () => {
  const socket = React.useContext(SocketContext); 
  const navigate = useNavigate()
  
  const createRoom = () => {
    let userName = window.prompt("Please enter your username!")
    navigate("/games/kaleidos/createRoom")
    socket.emit("createRoom", {
      userName: userName, 
      gameId: makeId(4)
    })
  }
  const joinRoom = () => {
    navigate("/games/kaleidos/joinRoom")
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

  const description = <div>The game <strong>Kaleidos</strong> comes with several paintings, each depicting a scene packed (to greater and lesser extents) 
  with various objects. Every round a random letter is chosen and everyone gets 120 seconds to write down as many things beginning with that letter as they can find 
  in the scene. Once time has expired, players read through the lists.
  <br/> <br/>
  Any object on multiple lists scores one point for those who wrote it. Any item unique to a single 
  list scores three points. When all lists have been scored everyone advances to the next scene and a new letter is chosen. The high score after all 12 scenes wins.
  </div>

    return (
      <PregameLobby 
        createRoom={createRoom}
        joinRoom={joinRoom}
        description={description}
      />
    )
}

export default Kaleidos