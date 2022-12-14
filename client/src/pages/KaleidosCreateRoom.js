import React, { useState, useEffect, useRef } from 'react'
import { SocketContext } from "../socket";
import RoomOneTeam from "../components/RoomOneTeam"
import { useNavigate } from "react-router-dom";

const KaleidosCreateRoom = () => {

  const [gameId, setGameId] = useState("")
  const [users, setUsers] = useState([])
  const [isGameMaster, setGameMaster] = useState(false)

  const socket = React.useContext(SocketContext);
  const tempUserList = useRef()
  const navigate = useNavigate()
  
  const thisUser = useRef()

  useEffect(() => {

    socket.on("create", (roomData) => {
      setGameId(roomData.gameId)
      setUsers([{
        userId: roomData.user1.userId,
        userName: roomData.user1.userName
      }])
      console.log(`${roomData.user1.userName} has created Room ${roomData.gameId}`)
      setGameMaster(true)
    })

    socket.on("requestRoomData", (newUser) => {
      if (isGameMaster) {
        tempUserList.current = [...users, {
          userId: newUser.userId,
          userName: newUser.userName
        }]
        setUsers(prevUsers => [...prevUsers, {
          userId: newUser.userId,
          userName: newUser.userName
        }])
        console.log(`${newUser.userName} has joined the lobby`)
        console.log(tempUserList)
        socket.emit("sendRoomDataServer", {
          gameId: newUser.gameId,
          user1: tempUserList.current[0],
          users: tempUserList.current
        })
      }
    })
    socket.on("receiveRoomData", (roomData) => {
      setGameId(roomData.gameId)
      setUsers(roomData.users)
    })

    socket.on("kaleidosReceivePlayers", (data) => {
      thisUser.current = data.users.find((user) => user.userId === socket.id)
      console.log(thisUser)
      navigate(`/games/kaleidos/room${data.gameId}/${thisUser.current.userName}`, 
      {state: {isGameMaster: isGameMaster, users: users, data: data }})
    })

    return () => {
      socket.off("create");
      socket.off("requestRoomData")
      socket.off("receiveRoomData")
      socket.off("kaleidosReceivePlayers")
    }
  })

  function startGame(){
    if (isGameMaster) {
      const urlLink = `/games/kaleidos/room${gameId}/${users[0].userName}`
      const urlState = {state: {isGameMaster: isGameMaster, users: users, data: {objectImage: "", letter: "" } }}
      navigate(urlLink, urlState)
    }
  }
  
  return (
    <RoomOneTeam 
    gameId={gameId}
    users={users}
    isGameMaster={isGameMaster}
    startGame={startGame}
  />
  )
}

export default KaleidosCreateRoom
