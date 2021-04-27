import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
import { Link } from 'react-router-dom';
  

// type NavProps = {
//     children: JSX.Element;
// }

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Spinnovations</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {/* <NavItem>
                <NavLink href="/Products">Products</NavLink>
              </NavItem> */}
              <NavItem>
                <Link className='nav-link' to='/products'>Products</Link>
              </NavItem>
              <NavItem>
                <NavLink href="/Orders">Orders</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  
  export default Navigation;