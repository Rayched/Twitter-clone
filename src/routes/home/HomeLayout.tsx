import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: black;
    justify-content: center;
`;

const OutletContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 600px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: black;
    border: 1px solid darkgray;
    border-top-width: 0px;
    border-bottom-width: 0px;
`;

const Sidebar = styled.aside`
    width: 80px;
    height: 50px;
    background-color: white;
`;

export default function HomeLayout(){
    const [InnerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const ResizeListener = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener("resize", ResizeListener);
    });

    return (
        <Wrapper>
            <NavigationBar />
            <OutletContainer>
                <Outlet />
            </OutletContainer>
            {InnerWidth > 1000 ? <Sidebar>사이드바</Sidebar> : null}
        </Wrapper>
    );
}