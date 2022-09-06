import React, {useState, useEffect, useRef} from 'react'
import { SocketContext } from "../socket"
import { useLocation, useParams } from "react-router-dom";
import ChameleonTable from "../components/ChameleonTable"
import ChameleonPlayerActionContainer from "../components/ChameleonPlayerActionContainer"
import ChameleonImageContainer from '../components/ChameleonImageContainer';

const ChameleonGame = () => {

  const socket = React.useContext(SocketContext);
  const location = useLocation()
  const {isGameMaster, users, data} = location.state
  const currentUser = users.find( (user) => socket.id === user.userId )
  const { gameId } = useParams()
  const currentTopic = useRef()
  const currentChameleonPlayer = useRef()

  useEffect(() => {
    if(isGameMaster) {
      socket.emit("chameleonInitPlayers", {
        users: users,
        gameId: gameId,
        topic: currentTopic.current,
        chameleonPlayer: currentChameleonPlayer.current
      })
    }
    console.log("page is rendered")
    socket.on("chameleonUpdateTopic", (currentTopic) => {
      console.log(`The new Topic is ${currentTopic}`)
      setTopic(currentTopic)})

    socket.on("chameleonUpdateGameState", (data) => {
      setWords((oldWords) => {
        const tempWords = [...oldWords]
        const newWords = tempWords.map( (obj) => {
          if (obj.userName === data.currentUser.userName) {
            return {...obj, word: data.wordClue}
          } else  return obj 
        })
        return newWords
      })
      setPlayerReady((oldPlayerReady) => {
        const tempPlayerReady = [...oldPlayerReady]
        const newPlayerReady = tempPlayerReady.map( (obj) => {
          if (obj.userName === data.currentUser.userName) {
            return {...obj, ready: data.isChecked}
          } else  return obj 
        })
        return newPlayerReady
      })
    })

    socket.on("chameleonUpdateVote", (data) => {
      setVotes((oldVotes) => {
        const tempVotes = [...oldVotes]
        const newVotes = tempVotes.map( (obj) => {
          if (obj.userName === data.currentUser.userName) {
            return {...obj, vote: data.playerVote}
          } else return obj
        })
        return newVotes
      })
    })

    socket.on("chameleonNextRound", (data) => {
      console.log(data.topic)
      setScores(data.scores)
      setTopic(data.topic)
      setChameleonPlayer(data.chameleonPlayer)
      setIsChecked(false)
      setWordClue("")
      setPlayerReady(initPlayerReady)
      setVotes(initVotes)
      setWords(initWords) 
      setRoundNum(data.roundNum)
    })

    return () => {
      socket.off("chameleonInitPlayers")
      socket.off("chameleonUpdateTopic")
      socket.off("chameleonUpdateGameState")
      socket.off("chameleonUpdateVote")
      socket.off("chameleonNextRound")
    }
  }, [])

  //initialize states
  let initVotes = []
  let initWords = []
  let initScore = []
  let initPlayerReady = []

  for (let i=0; i<users.length; i++) {
    initVotes.push({
      userName: users[i].userName,
      vote: ""
    })
    initWords.push({
      userName: users[i].userName,
      word: ""
    })
    initScore.push({
      userName: users[i].userName,
      score: 0
    })
    initPlayerReady.push({
      userName: users[i].userName,
      ready: false
    })
  }
  let topicArray = [
    "berufe", "bundeslaender", "essen", "fiktionale-charaktere", "film-genres", "geografie", 
    "getraenke", "kunst", "laender", "musik", "mystische-kreaturen", "phobien", "schule", 
    "sport", "transportmittel", "weltwunder", "zeichentrick-tiere", "zivilisation", "zoo"
  ]

  const [topic, setTopic] = useState(data.topic !== "" ? data.topic : randomizeTopic() ) //change
  const [votes, setVotes] = useState(initVotes)
  const [words, setWords] = useState(initWords)
  const [playerReady, setPlayerReady] = useState(initPlayerReady)
  const [scores, setScores] = useState(initScore)
  const [wordClue, setWordClue] = useState("")
  const [playerVote, setPlayerVote] = useState("")
  const [roundNum, setRoundNum] = useState(1)
  const [chameleonPlayer, setChameleonPlayer] = useState(data.chameleonPlayer !== "" ? data.chameleonPlayer: chooseChameleonPlayer() )
  const [isChecked, setIsChecked] = useState(true)
  const [winner, setWinner] = useState("")

  function randomizeTopic(){
    const topicNum = topicArray.length
    const randNum = Math.floor(Math.random()*topicNum)
    currentTopic.current = topicArray[randNum]
    return currentTopic.current
  }

  function chooseChameleonPlayer() {
    let randNum = Math.floor(Math.random() * users.length)
    currentChameleonPlayer.current = users[randNum].userName 
    return currentChameleonPlayer.current
  }

  function checkBoxHandler() {
    setIsChecked((oldIsChecked) => !oldIsChecked)
    socket.emit("chameleonUpdateGameStateServer", {
      gameId: gameId,
      currentUser: currentUser,
      wordClue: wordClue,
      isChecked: isChecked
    })
  }

  function voteHandler() {
    socket.emit("chameleonUpdateVoteServer", {
      gameId: gameId,
      currentUser: currentUser,
      playerVote: playerVote,
    })
  }

  function randomizeHandler() {
    if (isGameMaster){
      setTopic(randomizeTopic())
      socket.emit("chameleonUpdateTopicServer", {
        gameId: gameId,
        currentTopic: currentTopic.current
      })
    }
  }

  function roundHandler() {
    if (isGameMaster) {
      const tempScores = [...scores]
      const newScores = tempScores.map((obj) => {
        if(obj.userName === chameleonPlayer && winner==="chameleon") {
          return {...obj, score: obj.score+2}
        }
        else if (obj.userName !== chameleonPlayer && winner==="team") {
          return {...obj, score: obj.score+1}
        } else return obj
      })
    socket.emit("chameleonNextRoundServer", {
      scores: newScores,
      gameId: gameId,
      topic: randomizeTopic(),
      chameleonPlayer: chooseChameleonPlayer(),
      roundNum: roundNum+1
    })
    }
  }

  return (
    <div className="chameleonContainerAll">
      <ChameleonTable
        votes={votes}
        users={users}
        words={words}
        playerReady={playerReady}
        scores={scores}
        currentUser={currentUser}
      />
      <ChameleonImageContainer 
        topic={topic}
        chameleonPlayer={chameleonPlayer}
        currentUser={currentUser}
      />
      <ChameleonPlayerActionContainer 
          wordClue={wordClue} 
          setWordClue={setWordClue}
          isChecked={isChecked}
          checkBoxHandler={checkBoxHandler}
          playerVote={playerVote}
          setPlayerVote={setPlayerVote}
          users={users}
          currentUser={currentUser}
          voteHandler={voteHandler}
          winner={winner}
          setWinner={setWinner}
          roundHandler={roundHandler}  
          roundNum={roundNum}
          randomizeHandler={randomizeHandler}
      />
    </div>
  )
}

export default ChameleonGame