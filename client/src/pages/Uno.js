import React from 'react'
import { useNavigate } from "react-router-dom";
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")


function Uno() {

  const navigate = useNavigate()

  const unoCreateRoom = () => {
    //Create Random Code
    //generate new Forms to input Name + create Btn
    navigate("/games/uno/createRoom")
    socket.emit("unoCreateRoom", "data"
    )
  }
  const unoJoinRoom = () => {
    //Generate new form to input name and room code + Join Btn
    console.log("Join Room")
    navigate("/games/uno/joinRoom")
  }
  return (
    <div className="uno--container">
      <div className="uno--item1">
        <button className="uno--createBtn" onClick={unoCreateRoom}>Create Room</button>
      </div>
      <div className="uno--item2">
        <button className="uno--joinBtn" onClick={unoJoinRoom}>Join Room</button>
      </div>
      <div className="uno--item3">
        <div><strong>Uno</strong> is the highly popular card game played by millions around the globe. This game is played by matching and then discarding the cards in one’s hand till none are left. Since its inception, there are now many versions of Uno that one can play.</div>
      </div>
    </div>
  )
}

export default Uno
