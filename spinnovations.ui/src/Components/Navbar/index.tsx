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
import Auth from '../Auth';
import { User } from '../../Helpers/Interfaces/UserInterfaces';

type NavProps = {
  user: User | null;
};

const Navigation = ({ user }: NavProps): JSX.Element => {
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
            { user && 
            <NavItem>
              <NavLink href="/Add-Product">Add Product</NavLink>
            </NavItem>
            }
            {user && (
              <NavItem>
                <NavLink href="/Profile">Profile</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
        <SearchInput />
        <Auth user={user} />
      </Navbar>
    </div>
  );
};

export default Navigation;
