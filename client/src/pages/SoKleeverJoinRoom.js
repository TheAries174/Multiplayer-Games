import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../socket";
import JoinRoomPage from "../components/JoinRoomPage"

const SoKleeverJoinRoom = () => {
  const [gameId, setGameId] = useState("");
  const [playerName, setPlayerName] = useState("")
  
  const socket = React.useContext(SocketContext);
  const navigate = useNavigate()

  function submitData(event) {
    event.preventDefault(); // prevents error "Form submission canceled because the form is not connected"
    socket.emit("JoinRoom", [gameId, playerName])
    navigate("/games/kaleidos/createRoom")
  }  

  return (
    <JoinRoomPage 
        gameId={gameId}
        setGameId={setGameId}
        playerName={playerName}
        setPlayerName={setPlayerName}
        submitData={submitData}
    />
  )
}

export default SoKleeverJoinRoom
