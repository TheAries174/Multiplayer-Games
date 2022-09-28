import React, {useState, useEffect, useRef} from 'react'
import { SocketContext } from "../socket"
import { useLocation, useParams } from "react-router-dom";
import randomizeIcon from "../assets/images/change-icon.png"
import PhaseOnePlayerContainer from '../components/kaleidos/phaseOnePlayerContainer';
import PhaseOneObjectImageContainer from '../components/kaleidos/PhaseOneObjectImageContainer';
import PhaseTwoPlayerContainer from '../components/kaleidos/PhaseTwoPlayerContainer';
import PhaseTwoObjImage from '../components/kaleidos/PhaseTwoObjImage';
import PhaseThreePlayerContainer from '../components/kaleidos/PhaseThreePlayerContainer';

const KaleidosGame = () => {
  const socket = React.useContext(SocketContext);
  const location = useLocation()
  const {isGameMaster, users, data} = location.state
  const currentUser = users.find( (user) => socket.id === user.userId )
  const { gameId } = useParams()
  const currentObjImage = useRef()
  const currentLetter =  useRef()
  const currentRound = useRef()
  const timeRef = useRef()
  const allWordsRef = useRef([])
  const duplicateWordsRef = useRef() 
  
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
      setBlur(false)
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
          clearInterval(timer)
          setPhase("phase 2")
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
        let newUserData = tempUserData.map((obj) => {
          if (obj.userName === data.currentUser.userName) {
            return({...obj, words: newWordList.words, score: newWordList.score, isUpdated: true})
          } else return obj
        })

        //if every wordList is updated -> update score
        if (newUserData.every((obj) => obj.isUpdated === true )) {
          //add all words to one array, sort them alphabetically and lowercase them
          newUserData = newUserData.map((obj) => {
            obj.words.sort()
            obj.words.map( (word) => word.toLowerCase() )
            allWordsRef.current = [...allWordsRef.current, ...obj.words]
            return obj
          })
          console.log(allWordsRef.current)
          //find duplicate elements and save them in one array
          duplicateWordsRef.current = allWordsRef.current.filter((item, index) => index !== allWordsRef.current.indexOf(item))
          console.log(duplicateWordsRef.current)
          //compare words array with uniqueWord array and change score (3points if unique otherwise 1)
          newUserData = newUserData.map((obj) => {
            let isDuplicateWord
            for (const word of obj.words){
              isDuplicateWord = false
              for (const duplicateWord of duplicateWordsRef.current){
                if (word === duplicateWord) {
                  isDuplicateWord = true
                }
              }
              obj = {...obj, score: obj.score + (isDuplicateWord ? 1 : 3)}
              console.log(`Score: ${obj.score} + ${(isDuplicateWord ? 1 : 3)}, ${isDuplicateWord}`)
            }
            return obj
          })
          currentUserData.current = newUserData
          console.log("score was updated")
        }
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
        if (currentRound.current <3) {
          setPhase("phase 1")
        } else {
          setPhase("phase 3")
          editAllScores()
        } 
        return currentRound.current
      })
      //Reset Data
      setCounter(() => {
        timeRef.current = 10
        return timeRef.current
      })
      setUserData((oldUserData) => {
        const tempUserData = [...oldUserData]
        const newUserData = tempUserData.map((obj) => {
          return {
            ...obj,
            open: false,
            words: [],
            isUpdated: false
          }
        })
        currentUserData.current = newUserData
        return newUserData
      })
      setBlur(true)
      allWordsRef.current = []
      duplicateWordsRef.current = []
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
      isUpdated: false,
      score: 0,
    })
  }
  
  const currentUserData = useRef(initUserData)

  const [userData, setUserData] = useState(initUserData)
  const [playerWord, setPlayerWord] = useState("")
  const [counter, setCounter] = useState(10)
  const [letter, setLetter] = useState(isGameMaster ? randomLetter() : data.letter)
  const [objImage, setObjImage] = useState(isGameMaster ? randomObjImage() : data.objImage )
  const [blur, setBlur] = useState(true)
  const [phase, setPhase] = useState("phase 1")
  const [round, setRound] = useState(1)
  const [allScores, setAllScores] = useState([])


  function submitHandler() {
    if (playerWord !== "") {
      setUserData((oldUserData) => {
        const tempUserData = [...oldUserData]
        const newUserData = tempUserData.map((obj) => {
          if (obj.userName === currentUser.userName) {
            return {...obj, words: [...obj.words, playerWord]}
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
        console.log(tempUserData)
        const newUserData = tempUserData.map((obj) => {
          if(obj.userName === event.target.id) {
            let isDuplicateWord=false
            for (const duplicateWord of duplicateWordsRef.current) {
              if(event.target.textContent===duplicateWord) {
                isDuplicateWord = true
              }
            }
            return({
              ...obj, 
              words: obj.words.filter((word) => word !== event.target.textContent), 
              score: obj.score - (isDuplicateWord ? 1 : 3)
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

  function editAllScores() {
    setAllScores(() => {
      const tempAllScores = currentUserData.current.map((obj) => {
        return {
          userName: obj.userName,
          score: obj.score,
        }
      })
       //sort allScores from biggest to smallest
      tempAllScores.sort((a, b) => b.score - a.score)
      console.log(tempAllScores)
      return tempAllScores
    })
  }

  return (
    <div className="containerAll">
    {
      phase === "phase 1" &&
      <>
        <PhaseOnePlayerContainer 
          wordArray={wordArray}
          round={round}
          letter={letter}
          randomizeIcon={randomizeIcon}
          randomizeLetterHandler={randomizeLetterHandler}
          counter={counter}
          startRound={startRound}
          playerWord={playerWord}
          setPlayerWord={setPlayerWord}
          submitHandler={submitHandler}
        />
        <PhaseOneObjectImageContainer 
          blur={blur}
          objImage={objImage}
          phase={phase}
        />
      </>
    }
    {
      phase === "phase 2" && 
      <>
        <PhaseTwoPlayerContainer
          users={users}
          nextRoundHandler={nextRoundHandler}
          userData={userData}
          wordClickHandler={wordClickHandler}
          toggleHandler={toggleHandler}
        />
        <PhaseTwoObjImage 
          objImage={objImage}
        />
      </>
    }
    {
      phase === "phase 3" && 
      <>
        <PhaseThreePlayerContainer 
          allScores={allScores}
        />
      </>
    }
    </div>
  )
}

export default KaleidosGame