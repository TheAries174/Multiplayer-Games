import React, {useState, useEffect, useRef} from 'react'
import { SocketContext } from "../socket"
import { useLocation, useParams } from "react-router-dom";

const KaleidosGame = () => {
  const socket = React.useContext(SocketContext);
  const location = useLocation()
/*   const {isGameMaster, users, data} = location.state
  const currentUser = users.find( (user) => socket.id === user.userId ) */
  const { gameId } = useParams()
  const currentObjImage = useRef()
  const currentLetter =  useRef()
/*   useEffect(() => {
    if(isGameMaster) {
      socket.emit("kaleidosInitPlayers", {
        users: users,
        gameId: gameId,
        objImage: currentObjImage.current,
        letter: currentLetter.current 
      })
    }

    //socket Update ObjImage
    //socket update all words after the first phase
    
    return () => {
      socket.off("kaleidosInitPlayers")
    }
  }, []) */

  //initialize
  const [words, setWords] = useState([])
  const [playerWord, setPlayerWord] = useState("")

  function submitHandler() {
    setWords((oldWords) => [...oldWords, playerWord])
  }
  return (
    <div className="containerAll">
      <div className="playerContainer">
        <ul>Wörterliste
          {words.map((word) => <li key={word}>{word}</li>)}
        </ul>
        <div className="playerActionContainer">
          <input 
            type="text"
            placeholder="Type your word"
            value={playerWord}
            onChange={(event) => setPlayerWord(event.target.value)}
            />
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>
      <div className="objectImageContainer" >
        <img 
          className= "objectImage"
          src={require("../assets/kaleidos/objImage1.jpg")} 
          alt="painting with many objects"
        /> 
      </div>
    </div>
  )
}

export default KaleidosGame