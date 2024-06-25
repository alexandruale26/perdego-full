import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import AuthenticateLayout from "./components/authenticate/AuthenticateLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
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
    <div className="w-full h-screen flex items-center justify-center">ham</div>
  );
}
App.displayName = "App";

export default App;
