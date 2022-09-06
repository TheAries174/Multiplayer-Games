import styled from "styled-components"
import { Link } from "react-router-dom"

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FDFDFD;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  height: 65px;
  font-size: 24px;
  border-radius: 10px;
`;
  
export const NavbarLogoImg = styled.img`
  width: 40px;
  margin: 0 30px 0 50px;
`
  
export const NavbarItem1 = styled.div`
  display: flex;
  align-items: center;
`
  
export const NavbarItem2 = styled.div`
  margin-right: 50px;
`

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin: 0 20px;
`;