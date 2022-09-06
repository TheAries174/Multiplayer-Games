import React from 'react'
import { NavbarContainer, NavbarItem1, NavbarLogoImg, NavbarItem2, StyledLink } from "./Navbar.style"
import sandboxLogo from "../../assets/images/sandbox.png"

const Navbar = () => {
  return (
    <NavbarContainer> 
        <StyledLink to="/" >
          <NavbarItem1>
            <NavbarLogoImg src={sandboxLogo} alt="sandbox logo"/>
            <div>Website Name</div>
          </NavbarItem1>
        </StyledLink>
      <NavbarItem2>
        <StyledLink to="/games" >Games</StyledLink>
        <StyledLink to="/help" >Help</StyledLink>
      </NavbarItem2>
    </NavbarContainer>
  )
}

export default Navbar