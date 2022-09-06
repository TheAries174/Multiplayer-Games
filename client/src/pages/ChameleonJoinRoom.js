import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../socket";

function ChameleonJoinRoom(props) {
  const [gameId, setGameId] = useState("");
  const [playerName, setPlayerName] = useState("")
  
  const socket = React.useContext(SocketContext);
  const navigate = useNavigate()
  function submitData(event) {
    event.preventDefault(); // prevents error "Form submission canceled because the form is not connected"
    socket.emit("chameleonJoinRoom", [gameId, playerName])
    navigate("/games/chameleon/createRoom")
  }  
  return (
    <div className="joinRoom--container">
        <form className="joinRoom--form">
            <label htmlFor="gameCode">Game Code</label>
            <input 
                type="text" 
                id="gameCode" 
                className="joinRoom--input" 
                value={gameId} 
                onChange={(event) => setGameId(event.target.value)}
                required 
            />
            <label htmlFor="playerName">Player Name</label>
            <input 
                type="text" 
                id="playerName" 
                className="joinRoom--input" 
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                required
            />
            <button className="joinRoom--btn" onClick={(event) => submitData(event)}>Join</button>
        </form>
    </div>
  )
}

export default ChameleonJoinRoom