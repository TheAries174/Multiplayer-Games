import styled from "styled-components"

export const ContainerAll = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  width: 90%;
  margin: 20px auto;
`;

export const GameContainer = styled.div`
  display:flex;
  align-items: center;
  width:100%;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  flex-direction: column;
`;
export const GameCover = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 10px;
  object-fit: contain;
`;

export const GameTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px
`;

export const GameDescription = styled.div`
  white-space: pre-line;
`;