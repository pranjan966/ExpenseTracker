import './App.css';
import Login from './Component/Login/Login';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Home_Page from './Component/Pages/Home_Page';
import Profile from './Component/Pages/Profile';
import About from './Component/Pages/About';
import SignUp from './Component/SignUP/SignUp';
import WelcomePage from './Component/WelcomePage';
import UpdateProfile from './Component/UpdataProfle/UpdateProfile';

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { path: "/home", element: <Home_Page /> },
        { path: "/about", element: <About /> },
        { path: "/profile", element: <Profile /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/welcome-page", element: <WelcomePage /> },
        { path: "/update-profile", element: <UpdateProfile /> },

      ]
    },
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
