
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Layout from "./Routings/layout";
import Home from "./Routings/Home";
import Profile from "./Routings/Profile";
import Login from "./Routings/Login";
import CreateAccount from "./Routings/CreateAccount";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/createAccount",
    element: <CreateAccount />
  }
]);

function App() {
  return (
    <Wrapper>
      <RouterProvider router={Routers} />
    </Wrapper>
  );
}

export default App
