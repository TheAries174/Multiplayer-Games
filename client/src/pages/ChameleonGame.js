import React, {useState, useEffect, useRef} from 'react'
import { SocketContext } from "../socket"
import { useLocation, useParams } from "react-router-dom";
import changeIcon from "../assets/images/change-icon.png"
import ChameleonTable from "../components/ChameleonTable"
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
      setIsChecked(true)
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

 /*  useEffect(() => {
    //chameleonUpdateGameStateServer
  }, [playerReady]) */

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

  function checkBoxHandler() {
    setIsChecked((oldIsChecked) => !oldIsChecked)
    socket.emit("chameleonUpdateGameStateServer", {
      gameId: gameId,
      currentUser: currentUser,
      wordClue: wordClue,
      isChecked: isChecked
    })
  }

  function randomizeTopic(){
    const topicNum = topicArray.length
    const randNum = Math.floor(Math.random()*topicNum)
    currentTopic.current = topicArray[randNum]
    return currentTopic.current
  }

  function roundHandler() {
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

  function chooseChameleonPlayer() {
    let randNum = Math.floor(Math.random() * users.length)
    currentChameleonPlayer.current = users[randNum].userName 
    return currentChameleonPlayer.current
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

  function voteHandler() {
    socket.emit("chameleonUpdateVoteServer", {
      gameId: gameId,
      currentUser: currentUser,
      playerVote: playerVote,
    })
  }
  return (
    <div className="containerAll">
      <ChameleonTable
        votes={votes}
        users={users}
        words={words}
        playerReady={playerReady}
        scores={scores}
        currentUser={currentUser}
      />
      <div className="imageContainer">
        <img 
          src={require(`../assets/chameleon/${topic}.png`)}
          alt="topic"
          width="100%"
        />
        <div className="playerRole">
          {currentUser.userName === chameleonPlayer? "You are the Chameleon!" : "You are NOT the Chameleon!"}
        </div>
      </div>
      <div className="playerActionContainer">
        <label htmlFor="wordClue">
          Word Clue
          <input 
            type="text" 
            id="wordClue"
            value={wordClue} 
            onChange={(event) => setWordClue(event.target.value)}
          />
        </label>
        <label htmlFor="playerReady">
          Ready? 
          <input 
            type="checkbox" 
            id="playerReady"
            value={isChecked}
            onChange={checkBoxHandler}
          />
        </label>
        <div>
          <label htmlFor="playerVote">
            Vote
            <select
              id="playerVote"
              value={playerVote}
              onChange={(event) => setPlayerVote(event.target.value)}
            >
              <option value="" defaultValue>--Choose--</option>
              {users.map((user) => {
                if (user.userName!==currentUser.userName) {
                  return <option value={user.userName} key={user.userId}>{user.userName}</option>
                } else return null
              })}
            </select>
          </label>
          <button onClick={voteHandler}>Submit Vote</button>
        </div>
        <div>
          <label htmlFor="winner">
            Who won?
            <select
              id="winner"
              value={winner}
              onChange={(event) => setWinner(event.target.value)}
            >
              <option>--Choose--</option>
              <option value="team">Team</option>
              <option value="chameleon">Chameleon</option>
            </select>
          </label>  
          <button onClick={roundHandler}>Next Round</button>  
        </div>
        <div>
          <p>{`Round ${roundNum}`}</p>
          <img src={changeIcon} alt="random-icon" width="20px" style={{display: "inline"}} onClick={randomizeHandler}/>
        </div>
      </div>
    </div>
  )
}

export default ChameleonGame