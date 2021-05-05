import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
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
        <NavbarBrand href="/" className="scheme-pink">Spinnovations</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <a className=" scheme-orange" href="/"><i className="fas fa-cog"></i> Spin</a>
            </NavItem>
            <NavItem>
              <a className=" scheme-yellow" href="/Products"><i className="fas fa-eye"></i> Browse</a>
            </NavItem>
            <NavItem>
              <a className="scheme-green" href="/"><i className="fas fa-shopping-cart"></i> Cart</a>
            </NavItem>
            {user && 
              <NavItem>
                <a className="scheme-blue-green" href="/Profile"><i className="fas fa-user-circle"></i> Profile</a>
              </NavItem>
            }
            { user && 
            <NavItem>
              <a className="scheme-blue" href="/Add-Product"><i className="fas fa-plus-circle"></i> Add Product</a>
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
