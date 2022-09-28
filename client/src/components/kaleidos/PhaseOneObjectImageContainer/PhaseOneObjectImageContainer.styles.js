import styled, { keyframes } from "styled-components";

const unblurAnimation = keyframes`
  to { filter: blur(0)}
`
export const BlurredImage = styled.img`
  border-radius: 20px;
  width: 100%;
  filter: blur(15px);
  animation-name: ${props => props.blur ? "" : unblurAnimation};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`
export const ContainerAll = styled.div`
  grid-column: 3 / -1;
  animation-name: ${props => props.phase==="phase 2" ? objImageAnimation : ""};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`

const objImageAnimation = keyframes`
  to { opacity: 0}
`