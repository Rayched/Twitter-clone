import styled from "styled-components";
import { CreateArticleIcon, HomeIcon, Logos, LogoutIcon, ProfileIcon, SearchIcon } from "../../components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../FirebaseSetup";

const NavBar = styled.nav`
    width: 15%;
    min-width: 105px;
    max-width: 310px;
    height: 100%;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;

    .Logobox {
        margin-top: 1em;
    };
`;

const URLItemList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1em;
    height: 75%;
`;

const URLItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em 0px;
`;

const CreateArticleBtn = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 0px;
    padding: 3px;
    background-color: white;
    border: 1px solid white;
    border-radius: 30px;
`;

const URLNames = [
    "Logo", "Home", "Search", "Profile", "Creates", "Logout"
    /**
     * logo, home 모두 동일한 route 가리킴
     */
];

export default function NavigationBar(){
    const Navigate = useNavigate();
    
    const userSignout = () => {
        const isSignout = window.confirm("로그아웃 하시겠습니까?");

        if(isSignout){
            auth.signOut();
            alert("로그아웃");
            Navigate("/");
        } else {
            return;
        }
        
    };

    return (
        <NavBar>
            <div className="Logobox"><Logos w_value={35} h_value={38} /></div>
            <URLItemList>
                <ul>
                    <URLItem key="HomeIcon">
                        <HomeIcon w_value={35} h_value={33}/>
                    </URLItem>
                    <URLItem key="SearchIcon">
                        <SearchIcon w_value={35} h_value={33} />
                    </URLItem>
                    <URLItem key="ProfileIcon">
                        <ProfileIcon w_value={35} h_value={33} />
                    </URLItem>
                    <URLItem key="LogoutIcon" onClick={userSignout}>
                        <LogoutIcon w_value={35} h_value={33} />
                    </URLItem>
                    <CreateArticleBtn key="CreateIcon">
                        <Link to={"/home/addpost"}>
                            <CreateArticleIcon w_value={42} h_value={38} />
                        </Link>
                    </CreateArticleBtn>
                </ul>
            </URLItemList>
        </NavBar>
    );
}