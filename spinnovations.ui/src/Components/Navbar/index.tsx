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
      <Navbar expand="md">
        <NavbarBrand href="/">Spinnovations</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="scheme-blue" href="/"><i className="fas fa-cog"></i> Spin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="scheme-blue-green" href="/Products"><i className="fas fa-eye"></i> Browse</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="scheme-green" href="/"><i className="fas fa-shopping-cart"></i> Cart</NavLink>
            </NavItem>
            {user && 
              <NavItem>
                <NavLink className="scheme-yellow" href="/Profile"><i className="fas fa-user-circle"></i> Profile</NavLink>
              </NavItem>
            }
            { user && 
            <NavItem>
              <NavLink className="scheme-orange" href="/Add-Product"><i className="fas fa-plus-circle"></i> Add Product</NavLink>
            </NavItem>
            }
          </Nav>
        </Collapse>
        <SearchInput />
        <Auth user={user} />
      </Navbar>
    </div>
  );
};

export default Navigation;
