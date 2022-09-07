import styled from "styled-components"

export const JoinForm = styled.form`
  display: flex;
  padding: 20px;
  align-items: left;
  flex-direction: column;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  margin: 20px;
  gap: 20px;
  font-size: 20px;
`

export const JoinInput = styled.input`
  border: 0px;
  border-bottom: 1px solid black;
  height: 20px;
  font-size: 20px;
`

export const JoinBtn = styled.button`
  background-color: #0096FF;  
  width: 50%;
  height: 40px;
  font-size: 20px;
  color: white;
  border: 0px;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`