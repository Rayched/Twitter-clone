import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin: 5px 0px;

    a {
        text-decoration: none;
        color: black;

        &:hover {
            color: blue;
        }
    };
`;

export default function Layout(){
    return (
        <div>
            <NavBar>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/profile"}>Profile</Link>
                    </li>
                </ul>
            </NavBar>
            <Outlet />
        </div>
    );
}