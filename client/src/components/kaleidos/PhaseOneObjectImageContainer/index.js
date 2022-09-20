import React from 'react'
import { BlurredImage, ContainerAll } from "./PhaseOneObjectImageContainer.styles"

const PhaseOneObjectImageContainer = (props) => {
  return (
    <ContainerAll phase={props.phase}>
      <BlurredImage
        src={require(`../../../assets/kaleidos/${props.objImage}.jpg`)} 
        alt="painting with many objects"
        blur={props.blur}
      /> 
    </ContainerAll>
  )
}

export default PhaseOneObjectImageContainer