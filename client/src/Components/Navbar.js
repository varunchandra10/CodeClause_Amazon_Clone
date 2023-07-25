import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";

function Navbar() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const signOut = () => {
    dispatch({
      type: "SET_USER",
      user: null,
    });

    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Container>
      <Inner>
        <Logo onClick={() => navigate("/")}>
          <img src="./amazon_logo1.png" alt="amazonlogo" />
        </Logo>
        <SearchBar>
          <input type="text" placeholder="Search..." />
          <SearchIcon onClick={() => navigate("/addproduct")}>
            <img src="./searchIcon.png" alt="searchicon" />
          </SearchIcon>
        </SearchBar>
        <RightContainer>
          {/* <NavButton
            onClick={user ? () => signOut() : () => navigate("/login")}>
            <p>Hello,</p>
            <p>{user ? user?.fullName : "Guest"}</p>
          </NavButton> */}
          {user ? (
            <>
            <UserName onClick={()=> setShowLogoutPopup(!showLogoutPopup)}>
            <p>Hello,</p>
            <p>{user ? user?.fullName: "Guest"}</p>
            </UserName>
            {showLogoutPopup && (
              <LogoutPopup>
                <LogoutButton onClick={signOut}>Logout</LogoutButton>
              </LogoutPopup>
            )}
          </>):(
            <NavButton onClick={() => navigate("/login")}>
             <p>Hello,</p>
            <p>{user ? user?.fullName: "Guest"}</p>
            </NavButton>
          )}
          <NavButton onClick={() => navigate("/orders")}>
            <p>Return</p>
            <p>& Orders</p>
          </NavButton>
          <BasketButton onClick={() => navigate("/checkout")}>
            <img src="./basket-icon.png" alt="" />
            <p>{basket?.length}</p>
          </BasketButton>
        </RightContainer>
      </Inner>
      <MobileSearchbar>
        <input type="text" placeholder="Search..." />
        <SearchIcon onClick={() => navigate("/addproduct")}>
          <img src="./searchIcon.png" alt="" />
        </SearchIcon>
      </MobileSearchbar>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #131921;
  display: flex;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 767px) {
    height: 120px;
    flex-direction: column;
  }
`;
const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 767px) {
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  margin-left: 20px;
  cursor: pointer;
  img {
    width: 100px;
    margin-top: 10px;
  }
`;
const SearchBar = styled.div`
  height: 35px;
  flex: 1;
  margin: 0px 15px;
  display: flex;
  align-items: center;

  input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;

    &::placeholder {
      padding-left: 5px;
    }
  }

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const MobileSearchbar = styled.div`
  height: 35px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;

    &::placeholder {
      padding-left: 10px;
    }
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const SearchIcon = styled.div`
  background-color: #febd69;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0px 5px 5px 0px;
  img {
    width: 22px;
  }
`;
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  height: 100%;
  padding: 5px 15px;
`;

const NavButton = styled.div`
  color: #fff;
  padding: 5px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 15px;

  p {
    &:nth-child(1) {
      font-size: 12px;
    }

    &:nth-child(2) {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

const BasketButton = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  cursor: pointer;

  img {
    width: 30px;
    margin-right: 10px;
  }

  p {
    color: #fff;
    font-weight: 500;
  }
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-right: 15px;

  i {
    margin-left: 5px;
  }
`;

const LogoutPopup = styled.div`
  position: absolute;
  top: 100%;
  right:200px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #333;
  padding: 10px 15px;
  display: block;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;
export default Navbar;
