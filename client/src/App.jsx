import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import AuthenticateLayout from "./pages/Authenticate/components/AuthenticateLayout";
import Login from "./pages/Authenticate/Login";
import Signup from "./pages/Authenticate/Signup";
import ForgotPassword from "./pages/Authenticate/ForgotPassword";
import ChangePassword from "./pages/Authenticate/ChangePassword";
import AppLayout from "./components/AppLayout";
import RouteProtector from "./components/RouteProtector";
import TermsAndConditions from "./pages/TermsAndConditions";

import LocationSelect from "./components/shared/locationSelect/LocationSelect";

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
  // return <RouterProvider router={router} />;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[300px]">
        <LocationSelect />
      </div>
    </div>
  );
}
App.displayName = "App";

export default App;
