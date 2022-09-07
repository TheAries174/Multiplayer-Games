import styled from "styled-components";

export const ContainerAll = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; 
  justify-content: center;
  width:95%;
  margin: 0 auto;
`

export const CreateContainer = styled.div`
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0 20px;
  border-radius: 10px;
`

export const CreateBtn = styled.button`
  background-color: #97BC62;
  font-size: 20px;
  width: 90%;
  height: 50%;
  border: 0px;
  border-radius: 10px;
  color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  &:hover {
    cursor: pointer;
  }
`

export const JoinContainer = styled.div`
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 0 0;
  border-radius: 10px;
`

export const JoinBtn = styled.button`
  background-color: #2C5F2D;
  font-size: 20px;
  width: 90%;
  height: 50%;
  border: 0px;
  border-radius: 10px;
  color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  &:hover {
    cursor: pointer;
  }
`

export const DescriptionContainer = styled.div`
  grid-column: 1 / -1;
  background-color: white;
  padding: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin: 0 20px 20px 20px;
  border-radius: 10px;
`