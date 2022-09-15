import React, {useState, useEffect, useRef} from 'react'
import { SocketContext } from "../socket"
import { useLocation, useParams } from "react-router-dom";
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
  
  useEffect(() => {
    if(isGameMaster) {
      socket.emit("kaleidosInitPlayers", {
        users: users,
        gameId: gameId,
        objImage: currentObjImage.current,
        letter: currentLetter.current 
      })
    }

    socket.on("kaleidosUpdateLetter", (data) => {
      console.log(`The new Topic is ${data.letter}`)
      setLetter(data.letter)
    })

    //socket update all words after the first phase
    
    return () => {
      socket.off("kaleidosInitPlayers")
      socket.off("kaleidosUpdateLetter")
    }
  }, [])

  //initialize

  const initUserData = []

  for (let i=0; i < users.length; i++) {
    initUserData.push({
      userName: users[i].userName,
      words: [],
      open: false,
      score: 0,
    })
  }

  const [userData, setUserData] = useState(initUserData)
  const [playerWord, setPlayerWord] = useState("")
  const [counter, setCounter] = useState(10)
  const [letter, setLetter] = useState(isGameMaster ? randomLetter() : data.letter)
  const [objImage, setObjImage] = useState(isGameMaster ? randomObjImage() : data.objImage )
  const [blur, setBlur] = useState("15px")
  const [phase, setPhase] = useState("phase 1")
  const [round, setRound] = useState(1)
  const timeRef = useRef()

  function submitHandler() {
    setUserData((oldUserData) => {
      const tempUserData = [...oldUserData]
      const newUserData = tempUserData.map((obj) => {
        if (obj.userName === currentUser.userName) {
          return {...obj, words: [...obj.words, playerWord], score: obj.score+1}
        } else return obj
      })
      return newUserData
    })
    console.log(userData)
    setPlayerWord("")
  }

  function randomObjImage() {
    //there are 24 objImages
    const randNum = Math.floor(Math.random() * 24) + 1
    currentObjImage.current = `objImage${randNum}` 
    return currentObjImage.current
  }

  function randomLetter() {
      const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      currentLetter.current = characters.charAt(Math.floor(Math.random() * characters.length));
      return currentLetter.current
  }

  function randomizeLetterHandler () {
    if (isGameMaster){
      setLetter(randomLetter())
      socket.emit("kaleidosUpdateLetterServer", {
        gameId: gameId,
        letter: currentLetter.current
      })
    }

  }

  function startRound() {
    setBlur("0px")
    const timer = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) {
          timeRef.current = prevCounter -1
          return timeRef.current
        }
        return timeRef.current
      })
      if (timeRef.current === 0) {
        setPhase("phase 2")
        clearInterval(timer)
      }
    }, 1000)
  }

  let wordArray = userData.find((obj) => obj.userName === currentUser.userName) //maybe change because whole page gets rerendered?

  function toggleHandler(event) { 
    setUserData((oldUserData) => {
      const tempUserData = [...oldUserData]
      const newUserData = tempUserData.map((obj) => {
        if (obj.userName === event.target.id) {
          return({...obj, open: !obj.open})
        } else return obj
      })
      return newUserData
    })
  }

  function wordClickHandler(event) {
    setUserData((oldUserData) => {
      const tempUserData = [...oldUserData]
      const newUserData = tempUserData.map((obj) => {
        if(obj.userName === event.target.id) {
          return({
            ...obj, 
            words: obj.words.filter((word) => word !== event.target.textContent), 
            score: obj.score-1
          })} else return obj
      })
      return newUserData
    })
  }

  function nextRoundHandler(){
    //reset userData, keep score
    setRound(round+1)
    setCounter(60)
    setLetter(randomLetter)
    setUserData((oldUserData) => {
      const tempUserData = [...oldUserData]
      const newUserData = tempUserData.map((obj) => {
        return {
          ...obj,
          open: false,
          words: []
        }
      })
      return newUserData
    })
    setObjImage(randomObjImage())
    setBlur("15px")
    round<12 ? setPhase("phase 1") : setPhase("phase 3")
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
            <div>Letter: {letter}   
              <img 
                src={randomizeIcon}
                alt="randomize Icon"
                onClick={randomizeLetterHandler}
                width="15px"
              />
            </div>
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
          src={require(`../assets/kaleidos/${objImage}.jpg`)} 
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
            <button onClick={nextRoundHandler} className="nextRound-btn">Next Round</button>
            {
              userData.map((obj) => {
                return(
                  <details 
                    open={obj.open} 
                    onToggle={(event) => toggleHandler(event)}
                    id={obj.userName}
                  >
                    <summary><u>{obj.userName}</u></summary>
                    <ul>
                      {obj.words.map((word) => 
                        <li 
                          onClick={(event) => wordClickHandler(event)}
                          id={obj.userName}
                          key={word}
                        >{word}
                        </li>
                      )}
                    </ul>
                  </details>
                )
              })
            }
            <div>score</div>
            {
              userData.map((obj) => {
                return(
                  <div>{obj.open ? obj.score : "***"}</div>
                ) 
              })
            }
          </PlayerAndWordContainer>
        </div>
      <div className="objectImageContainer2" >
        <BlurredImage
          src={require(`../assets/kaleidos/${objImage}.jpg`)} 
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