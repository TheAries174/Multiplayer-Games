import React from 'react'

const ChameleonImageContainer = (props) => {
  return (
    <div className="imageContainer">
    <img 
      src={require(`../../assets/chameleon/${props.topic}.png`)}
      alt="topic"
      width="100%"
    />
    <div className="playerRole">
      {props.currentUser.userName === props.chameleonPlayer ? "You are the Chameleon!" : "You are NOT the Chameleon!"}
    </div>
    </div>
  )
}

export default ChameleonImageContainer