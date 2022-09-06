import styled from "styled-components";

export const ContainerAll = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  width: 90%;
  margin: 0 auto
`;

export const GameCodeContainer = styled.div`
  grid-column: 1 / -1;
  display:flex;
  width:100%;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px
`;

export const CopyLogoImg = styled.img`
  width: 30px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`
export const GameCodeNumber = styled.div`
  border-bottom: 1px solid black;
  margin-right: 10px;
`;

export const GameCodeText = styled.p`
  font-size: 12px;
  margin-bottom: 8px;
`;

export const GameCode = styled.p`
  font-size: 20px;
`;

export const GameCodeInstruction = styled.div`
  font-size: 20px;
`;

export const PlayerListContainer = styled.div`
  font-size: 20px;
  padding: 20px;
  width:100%;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const PlayerHeading = styled.div`
  display: flex; 
  align-items: center;
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
`;

export const PlayerIconImg = styled.img`
  width: 30px;
  margin-right: 20px;
`;

export const PlayerList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

export const StartContainer = styled.div`
  display: flex;
  font-size: 20px;
  padding: 20px;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width:100%;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const StartBtn = styled.button`
  background-color: #0096FF;  
  width: 50%;
  height: 50px;
  font-size: 20px;
  color: white;
  border: 0px;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-top: 20px;
`;