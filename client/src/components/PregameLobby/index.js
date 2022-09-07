import React from 'react'
import { ContainerAll, CreateContainer, CreateBtn, JoinContainer, JoinBtn, DescriptionContainer} from "./PregameLobby.styles"

const PregameLobby = (props) => {
  return (
    <ContainerAll>
    <CreateContainer>
      <CreateBtn onClick={props.createRoom}>Create Room</CreateBtn>
    </CreateContainer>
    <JoinContainer>
      <JoinBtn onClick={props.joinRoom}>Join Room</JoinBtn>
    </JoinContainer>
    <DescriptionContainer>
      {props.description}
    </DescriptionContainer>
  </ContainerAll>
  )
}

export default PregameLobby
