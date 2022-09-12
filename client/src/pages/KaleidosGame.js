import React, {useState, useEffect, useRef} from 'react'
import { SocketContext } from "../socket"
import { useLocation, useParams } from "react-router-dom";
import objImage from "../assets/kaleidos/objImage1.jpg"
import randomizeIcon from "../assets/images/change-icon.png"
import styled from "styled-components"

const BlurredImage = styled.img`
  border-radius: 20px;
  width: 100%;
  filter: blur(${props => props.blur})
`
const PlayerAndWordContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-content: space-between
`
const KaleidosGame = () => {
  const socket = React.useContext(SocketContext);
  const location = useLocation()
  const {isGameMaster, users, data} = location.state
  const currentUser = users.find( (user) => socket.id === user.userId )
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

  const initWordList = []
  for (let i=0; i < users.length; i++) {
    initWordList.push({
      userName: users[i].userName,
      words: [],
      open: "closed",
    })
  }
  const [wordList, setWordList] = useState(initWordList)
  const [playerWord, setPlayerWord] = useState("")
  const [counter, setCounter] = useState(10)
  const [letter, setLetter] = useState(randomLetter())
  const [blur, setBlur] = useState("15px")
  const [phase, setPhase] = useState("phase 1")
  const timeRef = useRef()

  function submitHandler() {
    setWordList((oldWordList) => {
      const tempWordList = [...oldWordList]
      const newWordList = tempWordList.map((obj) => {
        if (obj.userName === currentUser.userName) {
          return {...obj, words: [...obj.words, playerWord]}
        } else {return obj}
      })
      return newWordList
    })
    console.log(wordList)
    setPlayerWord("")
  }

  function randomLetter() {
      const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const result = characters.charAt(Math.floor(Math.random() * characters.length));
      return result
  }

  function startRound() {
    setBlur("0px")
    setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) {
          timeRef.current = prevCounter -1
          return timeRef.current
        }
        return timeRef.current
      })
      if (timeRef.current === 0) {
        setPhase("phase 2")
      }
    }, 1000)
  }

  let wordArray = wordList.find((obj) => obj.userName === currentUser.userName) //maybe change because whole page gets rerendered?

  function toggleHandler(event) { 
    console.log(event.target)
  }

  return (
    <div className="containerAll">
    {
      phase === "phase 1" &&
      <>
      <div className="playerContainer">
        <div className="wordsAndCounter">
          <ul>Wörterliste
            {
              wordArray.words.map((word) => <li key={word}>{word}</li> )
            }
          </ul>
          <div>
            <div>Letter: {letter} </div>
            <div>Time:{counter} s</div>
            <button onClick={startRound}>Start Round</button>
          </div>
        </div>
        <div className="playerActionContainer">
          <input 
            type="text"
            placeholder="Type your word"
            value={playerWord}
            onChange={(event) => setPlayerWord(event.target.value)}
            onKeyDown={(event) => {
              if(event.key==="Enter") {
                submitHandler()
              }
            }}
            />
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>
      <div className="objectImageContainer" >
        <BlurredImage
          src={objImage} 
          alt="painting with many objects"
          blur={blur}
        /> 
      </div>
      </>
    }
    
    {
      phase === "phase 2" && 
      <>
        <div className="playerContainer2">
          <PlayerAndWordContainer playerNumber={users.length}>
            <pre></pre> 
            {
              wordList.map((obj) => {
                return(
                  <details open={obj.open} onToggle={(event) => toggleHandler(event)}>
                    <summary><u>{obj.userName}</u></summary>
                    <ul>
                      {obj.words.map((word) => <li>{word}</li>)}
                    </ul>
                  </details>
                )
              })
            }
            <div>score</div>
            {
              wordList.map((obj) => {
                return(
                  <div>{obj.words.length}</div>
                )
              })
            }
          </PlayerAndWordContainer>
        </div>
      <div className="objectImageContainer2" >
        <BlurredImage
          src={objImage} 
          alt="painting with many objects"
          blur={blur}
        /> 
      </div>
      </>
    }
    </div>
  )
}

export default KaleidosGame