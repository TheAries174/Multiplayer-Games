import React, {useRef, useEffect} from 'react'
import { useContainerDimensions } from "../../util/useContainerDimension"

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
    const r1Info = { x: 58, y: 290, w: 376, h: 195 }; //size of original category rectangle
    const r1Style = { borderColor: 'purple', borderWidth: 5 };
    drawRect(r1Info, r1Style);
  }, [width, height]);

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

    x = x*width/origWidth + 376*width/origWidth;
    y = y*height/origHeight + 195*height/origHeight;
    w = w*width/origWidth;
    h = h*height/origHeight;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  } 

  return (
    <div className="imageContainer" ref={componentRef}>
      <img 
        src={require(`../../assets/chameleon/${props.topic}.png`)}
        alt="topic"
        width="100%" 
      />
      <div className="playerRole">
        {props.currentUser.userName === props.chameleonPlayer ? "You are the Chameleon!" : "You are NOT the Chameleon!"}
      </div>
      <canvas className="coveringCanvas" ref={canvasRef}></canvas>
    </div>
  )
}

export default ChameleonImageContainer