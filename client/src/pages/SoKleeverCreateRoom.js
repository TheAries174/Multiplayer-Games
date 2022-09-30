import React, { useState, useEffect, useRef } from 'react'
import { SocketContext } from "../socket";
import RoomTwoTeam from "../components/RoomTwoTeam";
import { useNavigate } from "react-router-dom";

const SoKleeverCreateRoom = () => {

  const [gameId, setGameId] = useState("")
  const [users, setUsers] = useState([])
  const [isGameMaster, setGameMaster] = useState(false)
  const [team1, setTeam1] = useState([])
  const [team2, setTeam2] = useState([])

  const socket = React.useContext(SocketContext)
  const tempUserList = useRef()
  const currentTeam1 = useRef()
  const currentTeam2 = useRef()
  const navigate = useNavigate()
  
  const currentUser = useRef()
  currentUser.current = users.find((user) => user.userId === socket.id)
  console.log(currentUser)

  useEffect(() => {

    socket.on("create", (roomData) => {
      setGameId(roomData.gameId)
      setUsers([{
        userId: roomData.user1.userId,
        userName: roomData.user1.userName
      }])
      console.log(`${roomData.user1.userName} has created Room ${roomData.gameId}`)
      setGameMaster(true)
      currentTeam1.current = [roomData.user1]
      setTeam1(currentTeam1.current)
    })

    socket.on("requestRoomData", (newUser) => {
      if (isGameMaster) {
        tempUserList.current = [...users, {
          userId: newUser.userId,
          userName: newUser.userName
        }]
        setUsers(tempUserList.current)
        console.log(`${newUser.userName} has joined the lobby`)
        if (team1.length > team2.length) {
          currentTeam2.current = [...team2, newUser]
          setTeam2(currentTeam2.current)
        }
        if (team2.length >= team1.length) {
          currentTeam1.current = [...team1, newUser]
          setTeam1(currentTeam1.current)
        }
        socket.emit("sendRoomDataServer", {
          gameId: newUser.gameId,
          user1: tempUserList.current[0],
          users: tempUserList.current,
          team1: currentTeam1.current,
          team2: currentTeam2.current
        })
      }
    })
    socket.on("receiveRoomData", (roomData) => {
      setGameId(roomData.gameId)
      setUsers(roomData.users)
      setTeam1(roomData.team1)
      setTeam2(roomData.team2)
    })

    socket.on("soKleeverReceivePlayers", (data) => {
      currentUser.current = data.users.find((user) => user.userId === socket.id)
      console.log(currentUser)
      navigate(`/games/so-kleever/room${data.gameId}/${currentUser.current.userName}`, 
      {state: {isGameMaster: isGameMaster, users: users, data: data }})
    })

    return () => {
      socket.off("create");
      socket.off("requestRoomData")
      socket.off("receiveRoomData")
      socket.off("soKleeverReceivePlayers")
    }
  })
  
  function startGame() {
    if (isGameMaster) {
      const urlLink = `/games/so-kleever/room${gameId}/${users[0].userName}`
      const urlState = {state: {isGameMaster: isGameMaster, users: users, data: {} }}
      navigate(urlLink, urlState)
    }
  }

  function changeTeams() {

  }

  function randomizeTeams() {

  }
  return (
  <RoomTwoTeam 
    gameId={gameId}
    users={users}
    isGameMaster={isGameMaster}
    startGame={startGame}
    team1={team1}
    team2={team2}
    currentUser={currentUser.current}
    changeTeams={changeTeams}
    randomizeTeams={randomizeTeams}
  />
)
}

export default SoKleeverCreateRoom