import React from 'react';
import { Navbar, NavbarNav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { Link } from 'react-router-dom'; // Importamos el componente Link


const CustomNavbar = () => {
  return (
    <Navbar light expand="lg" className="bg-light">
      <NavbarNav>
        <NavItem>
          <Dropdown>
            <DropdownToggle nav caret>
              <img
                src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png"
                className="rounded-circle"
                height="35"
                alt="Portrait of user"
                loading="lazy"
              />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="/">Home</DropdownItem>
              <DropdownItem>
              <Link to="/calendar">Calendario</Link> 
              </DropdownItem>
              <DropdownItem>
                <Link to="/register">Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      </NavbarNav>
    </Navbar>
  );
};

export default CustomNavbar;
