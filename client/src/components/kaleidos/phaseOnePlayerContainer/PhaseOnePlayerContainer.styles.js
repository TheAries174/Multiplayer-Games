import styled from "styled-components"

export const ContainerAll = styled.div`
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  flex-direction: column;
  grid-column: 1 / 3;
`

export const GameData = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%
`

export const PlayerActionContainer = styled.div`
  display:flex;
  flex-direction: row;
  margin-bottom: 30px;
  width: 80%;
`