import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/newPost/NewPost";
import AuthenticateLayout from "./pages/authenticate/components/AuthenticateLayout";
import Login from "./pages/authenticate/Login";
import Signup from "./pages/authenticate/Signup";
import ForgotPassword from "./pages/authenticate/ForgotPassword";
import ChangePassword from "./pages/authenticate/ChangePassword";
import AppLayout from "./components/AppLayout";
import RouteProtector from "./components/RouteProtector";
import TermsAndConditions from "./pages/TermsAndConditions";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    // AUTHENTICATION
    element: <AuthenticateLayout />,
    children: [
      {
        path: "/cont-nou",
        element: <Signup />,
      },
      {
        path: "/autentificare",
        element: <Login />,
      },
      {
        path: "/am-uitat-parola",
        element: <ForgotPassword />,
      },
      {
        path: "/schimba-parola",
        element: <ChangePassword />,
      },
    ],
  },
  {
    // PROTECTED APP
    element: (
      <AppLayout>
        <RouteProtector />
      </AppLayout>
    ),
    children: [
      {
        path: "/administrare",
        element: <Dashboard />,
      },
      {
        path: "/anunturi/nou",
        element: <NewPost />,
      },
    ],
  },
  {
    path: "/despre-noi",
    element: (
      <AppLayout>
        <About />
      </AppLayout>
    ),
  },
  {
    path: "/termeni-si-conditii",
    element: (
      <AppLayout>
        <TermsAndConditions />
      </AppLayout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
App.displayName = "App";

export default App;
