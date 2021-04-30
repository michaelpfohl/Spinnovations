import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


const Navigation = (): JSX.Element => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Spinnovations</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Spin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Products">Browse</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Cart</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Profile">Profile</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <SearchInput/>
      </Navbar>
    </div>
  );
};

export default Navigation;
