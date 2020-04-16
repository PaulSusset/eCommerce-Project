import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

import NavCategory from './NavCategory';
import { useAuth0 } from '../../auth0/react-auth0-spa';

import { useSelector } from 'react-redux';
import logo from '../../assets/GadgetGrotto.png';
import darkLogo from '../../assets/GadgetGrottoDark.png';

function Navbar() {
  const COLORS = useSelector((state) => state.designSetting);
  // used to render the dropdown menu
  const [categories, setCategories] = useState([]);

  // fetches all the categories from the back end
  useEffect(() => {
    fetch('/list/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  // authetication
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // Styled components
  const Authenticators = styled.div`
    color: whitesmoke;
    font-size: 1.5em;

    transition: background-color 500ms;
    border-radius: 3px;
    padding: 10px;

    &:hover {
      border-bottom: ${COLORS.filter} solid 2px;
      color: black;
      background-color: lightgray;
      cursor: pointer;
    }

    a {
      text-decoration: none;
      color: whitesmoke;
    }
  `;

  const LoginAndOut = styled.div`
    position: fixed;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
  `;

  const LogoBG = styled.div`
    height: 100%;
    width: 106px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 3px;

    transition: background-color 500ms;

    &:hover {
      border-bottom: ${COLORS.filter} solid 2px;
      background-color: ${COLORS.main};
    }
  `;

  const NavContent = styled.div`
    padding: 10px;
    margin: 51px 0px 0px;
    font-size: 1.5em;
    color: ${COLORS.main};
    transition: background-color 500ms;
    border-radius: 3px;
    border-bottom: transparent solid 2px;

    transition: background-color 500ms;

    &:hover {
      cursor: pointer;
      color: ${COLORS.header};
      border-bottom: ${COLORS.filter} solid 2px;
      background-color: ${COLORS.main};
    }
  `;

  const Logo = styled.img`
    height: 107px;
    position: absolute;
    left: 0;
  `;

  const NavWrapper = styled.div`
    display: flex;
    position: relative;
    justify-content: flex-end;
    z-index: 1;
    height: 100%;

    a {
      text-decoration: none;
      color: black;
    }
  `;

  return (
    <>
      <LoginAndOut>
        {!isAuthenticated && (
          <Authenticators onClick={() => loginWithRedirect({})}>
            Log in
          </Authenticators>
        )}

        {isAuthenticated && (
          <>
            <Authenticators>
              <Link to="/profile">Profile</Link>
            </Authenticators>
            <Authenticators onClick={() => logout()}>Log out</Authenticators>
          </>
        )}
      </LoginAndOut>

      <NavWrapper>
        <Link to="/">
          <LogoBG>
            <Logo
              src={
                COLORS.logo === 'base'
                  ? logo
                  : COLORS.logo === 'dark'
                  ? darkLogo
                  : logo
              }
              alt="logo"
            />
          </LogoBG>
        </Link>
        <Link to="/">
          <NavContent>Home</NavContent>
        </Link>

        {/* the dropdown menu. The items are generated separately in another component through array.map() */}
        {/* had to be done as Dropdown.Toggle (old method) instead of DropdownButton (new method) to allow for styling */}
        <Dropdown>
          <Dropdown.Toggle as={NavContent}>Products</Dropdown.Toggle>

          <Dropdown.Menu>
            {categories.map((category) => {
              return <NavCategory category={category} />;
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Link to="/order-confirm/search">
          <NavContent>Order History</NavContent>
        </Link>
      </NavWrapper>
    </>
  );
}

export default Navbar;
