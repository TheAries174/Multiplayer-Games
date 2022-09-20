import styled from "styled-components";

export const ContainerAll = styled.div`
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
  grid-column: 1 / -1;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px
`