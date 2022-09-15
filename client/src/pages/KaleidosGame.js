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
  const currentUserData = useRef()
  const currentRound = useRef()
  const timeRef = useRef()
  
  useEffect(() => {
    if(isGameMaster) {
      socket.emit("kaleidosInitPlayers", {
        users: users,
        gameId: gameId,
        objImage: currentObjImage.current,
        letter: currentLetter.current 
      })
    }

    socket.on("kaleidosUpdateLetter", (letter) => {
      console.log(`The new Letter is ${letter}`)
      setLetter(letter)
    })

    socket.on("kaleidosStartRound", () => {
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
          socket.emit("kaleidosUpdateGameStateServer", {
            gameId: gameId,
            userData: currentUserData.current,
            currentUser: currentUser
          })
          setPhase("phase 2")
          clearInterval(timer)
        }
      }, 1000)
    })

    //socket update all words after the first phase
    socket.on("kaleidosUpdateGameState", (data) => {
      setUserData((oldUserData) => {
        const tempUserData = [...oldUserData]
        const newWordList = data.userData.find((obj) => {
          return obj.userName === data.currentUser.userName
        })
        const newUserData = tempUserData.map((obj) => {
          if (obj.userName === data.currentUser.userName) {
            return({...obj, words: newWordList.words, score: newWordList.score})
          } else return obj
        })
      currentUserData.current = newUserData
      return newUserData
      })
    })

    socket.on("kaleidosDeleteWords", (data) => {
      setUserData(data.userData)
    })
    
    socket.on("kaleidosNextRound", (data) => {
      //Update new Data
      setLetter(data.letter)
      setObjImage(data.objImage)
      setRound((oldRound) => {
        currentRound.current = oldRound + 1
        return currentRound.current
      })
      //Reset Data
      setCounter(() => {
        timeRef.current = 60
        return timeRef.current
      })
      setUserData((oldUserData) => {
        const tempUserData = [...oldUserData]
        const newUserData = tempUserData.map((obj) => {
          return {
            ...obj,
            open: false,
            words: []
          }
        })
        currentUserData.current = newUserData
        return newUserData
      })
      setBlur("15px")
      currentRound.current <12 ? setPhase("phase 1") : setPhase("phase 3")
      console.log(currentRound.current)
    })
    return () => {
      socket.off("kaleidosInitPlayers")
      socket.off("kaleidosUpdateLetter")
      socket.off("kaleidosUpdateGameState")
      socket.off("kaleidosDeleteWords")
      socket.off("kaleidosNextRound")
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


  function submitHandler() {
    if (playerWord !== "") {
      setUserData((oldUserData) => {
        const tempUserData = [...oldUserData]
        const newUserData = tempUserData.map((obj) => {
          if (obj.userName === currentUser.userName) {
            return {...obj, words: [...obj.words, playerWord], score: obj.score+1}
          } else return obj
        })
        currentUserData.current = newUserData
        return newUserData
      })
      setPlayerWord("")
    }
    console.log(userData)
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
    socket.emit("kaleidosStartRoundServer", gameId)
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
      currentUserData.current = newUserData
      return newUserData
    })
  }

  function wordClickHandler(event) {
    if(isGameMaster) {
      setUserData((oldUserData) => {
        const tempUserData = [...oldUserData]
        const newUserData = tempUserData.map((obj) => {
          if(obj.userName === event.target.id) {
            return({
              ...obj, 
              words: obj.words.filter((word) => word !== event.target.textContent), 
              score: obj.score-1
            })
          } else return obj
        })
      currentUserData.current = newUserData
      socket.emit("kaleidosDeleteWordsServer", {
        gameId: gameId,
        userData: currentUserData.current
      })
      return newUserData
      })
    }
  }

  function nextRoundHandler(){
    setLetter(randomLetter)
    setObjImage(randomObjImage())
    socket.emit("kaleidosNextRoundServer", {
      gameId: gameId,
      letter: currentLetter.current,
      objImage: currentObjImage.current
    })
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