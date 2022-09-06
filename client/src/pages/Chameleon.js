import React from 'react';
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../socket";
 
const Chameleon = (props) => {
  const socket = React.useContext(SocketContext); 
  const navigate = useNavigate()
  const chameleonCreateRoom = () => {
      
    //Create Random Code
    let userName = window.prompt("Please enter your username!")
    navigate("/games/chameleon/createRoom")
    socket.emit("chameleonCreateRoom", {
      userName: userName, 
      gameId: makeId(4)
    })
  }
  const chameleonJoinRoom = () => {
    navigate("/games/chameleon/joinRoom")
    // console.log("Join Room")
    // navigate("/games/chameleon/joinRoom")
  }

  function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }

    return (
      <div className="uno--container">
        <div className="uno--item1">
          <button className="uno--createBtn" onClick={chameleonCreateRoom}>Create Room</button>
        </div>
        <div className="uno--item2">
          <button className="uno--joinBtn" onClick={chameleonJoinRoom}>Join Room</button>
        </div>
        <div className="uno--item3">
          <div><strong>Chameleon</strong> is a bluffing deduction game for everyone.
            Each round involves two missions, depending on whether you’re the Chameleon or not.
            Mission 1: You are the Chameleon. No one knows your identity except you. Your mission is to blend in, not get caught and to work out the Secret Word.
            Mission 2: You are not the Chameleon. Try to work out who the Chameleon is without giving away the Secret Word.
          </div>
        </div>
      </div>
    )
}

export default Chameleon
