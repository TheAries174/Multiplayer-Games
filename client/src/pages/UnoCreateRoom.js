import React from 'react'
import RoomTwoTeam from "../components/RoomTwoTeam"

function UnoCreateRoom() {
  return (
    <RoomTwoTeam gameId="1234" users={[{userId: 1, userName: "sigma"}]}>
    </RoomTwoTeam>
  )
}

export default UnoCreateRoom
