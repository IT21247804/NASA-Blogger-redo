import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";
import CreatePost from "./components/home/CreatePost";
import PostHome from "./components/home/PostHome";
import Apod from "./components/home/Apod";
import MarsPhotos from "./components/home/MarsPhotos";
import Imagery from "./components/home/Imagery ";


import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/CreatePost",
      element: <CreatePost />,
    },
    {
      path: "/PostHome",
      element: <PostHome />,
    },
    {
      path: "/Apod",
      element: <Apod />,
    },
    {
      path: "/MarsPhotos",
      element: <MarsPhotos />,
    },
    {
      path: "/Imagery",
      element: <Imagery />,
    },
   
  ];
  let routesElement = useRoutes(routesArray);
  return (
    
     <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col" >{routesElement}</div>
    </AuthProvider>
 
   
  );
}

export default App;
