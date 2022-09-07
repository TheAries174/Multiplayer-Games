import React, {useRef, useEffect} from 'react'
import { useContainerDimensions } from "../../util/useContainerDimension"
import { ImageContainer, PlayerRoleText, CoveringCanvas } from "./ChameleonImageContainer.styles"

const ChameleonImageContainer = (props) => {

  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)
  console.log(`width:${width} and height${height}`)

  const canvasRef = useRef();
  let ctx = null;
 
  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvasRef.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
 
    // get context of the canvas
    ctx = canvasEle.getContext("2d");
    
    //Only draw Rectangle if player is not Chameleon
    if(props.currentUser.userName !== props.chameleonPlayer) {
      const rectInfo = { x: 58, y: 290, w: 376, h: 195 }; //size of original category rectangle in col:1, row:1
      const rectStyle = { borderColor: 'purple', borderWidth: 5 };  
      drawRect(rectInfo, rectStyle);
    }
  }, [width, height,props.topic]);

  //draw rect relative to canvas size
  const drawRect = (info, style = {}) => {
    let { x, y, w, h } = info;
    const { borderColor = 'black', borderWidth = 1 } = style;
    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    //measurements of original picture
    const origWidth = 1605
    const origHeight = 1103
    const widthOffset = 376
    const heightOffset = 195

    x = x*width/origWidth + widthOffset*width/origWidth*(props.topic.row-1);
    y = y*height/origHeight + heightOffset*height/origHeight*(props.topic.column-1);
    w = w*width/origWidth;
    h = h*height/origHeight;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  } 

  return (
    <ImageContainer ref={componentRef}>
      <img 
        src={require(`../../assets/chameleon/${props.topic.name}.png`)}
        alt="topic"
        width="100%" 
      />
      <PlayerRoleText>
        {props.currentUser.userName === props.chameleonPlayer ? "You are the Chameleon!" : "You are NOT the Chameleon!"}
      </PlayerRoleText>
      <CoveringCanvas ref={canvasRef}></CoveringCanvas>
    </ImageContainer>
  )
}

export default ChameleonImageContainer