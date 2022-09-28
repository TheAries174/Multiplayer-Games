import React from 'react'
import { ObjImage, ContainerAll } from "./PhaseTwoObjImage.styles"

const PhaseTwoObjImage = (props) => {
  return (
    <ContainerAll>
      <ObjImage
        src={require(`../../../assets/kaleidos/${props.objImage}.jpg`)} 
        alt="painting with many objects"
      /> 
    </ContainerAll>
  )
}

export default PhaseTwoObjImage