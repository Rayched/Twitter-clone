import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export default function Layout(){
    return (
        <LayoutWrapper>
            <Outlet />
        </LayoutWrapper>
    );
}