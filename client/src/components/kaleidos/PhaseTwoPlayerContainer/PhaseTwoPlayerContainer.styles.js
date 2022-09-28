import styled from "styled-components";

export const PlayerAndWordContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.playerNumber + 1}, auto);
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-content: space-between
`
export const ContainerAll = styled.div`
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
  grid-column: 1 / 4;
  padding: 20px 0px
`
export const NextRoundBtn = styled.button`
  height: 20px;
`