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
import logo from '../../Assets/Images/SpinnovationsLogo.png';

type NavProps = {
  user: User | null;
};

const Navigation = ({ user }: NavProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand href="/" className="scheme-pink"><img className="nav-logo" src={logo}/>Spinnovations</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <a className="scheme-orange" href="/Spin" data-toggle="tooltip" data-placement="bottom" title="Spin"><i className="fas fa-cog fa-lg spinning-cog"></i></a>
            </NavItem>
            <NavItem>
              <a className="scheme-yellow" href="/Products" data-toggle="tooltip" data-placement="bottom" title="Browse"><i className="fas fa-eye fa-lg"></i></a>
            </NavItem>
            <NavItem>
              <a className="scheme-green" href="/Cart" data-toggle="tooltip" data-placement="bottom" title="Cart"><i className="fas fa-shopping-cart fa-lg"></i></a>
            </NavItem>
            {user && 
              <NavItem>
                <a className="scheme-blue-green" href="/Profile" data-toggle="tooltip" data-placement="bottom" title="Profile"><i className="fas fa-user-circle fa-lg"></i></a>
              </NavItem>
            }
            { user && 
            <NavItem>
              <a className="scheme-blue" href="/Add-Product" data-toggle="tooltip" data-placement="bottom" title="Add Product"><i className="fas fa-plus-circle fa-lg"></i></a>
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
