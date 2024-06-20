{
  // import { BrowserRouter, Routes, Route } from "react-router-dom";
  // import Home from "./pages/Home";
  // import About from "./pages/About";
  // import Dashboard from "./pages/Dashboard";
  // import NewPost from "./pages/NewPost";
  // import Login from "./pages/Login";
  // import Signup from "./pages/Signup";
  // import Header from "./components/Header";
  // import Footer from "./components/Footer";
  // import RouteProtector from "./components/RouteProtector";
  // const router = createBrowserRouter([]);
  // function App() {
  //   return (
  //     <BrowserRouter>
  //       <Header />
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/signin" element={<Signup />} />
  //         <Route path="/about" element={<About />} />
  //         <Route element={<RouteProtector />}>
  //           <Route path="/dashboard" element={<Dashboard />} />
  //           <Route path="/posts/new" element={<NewPost />} />
  //         </Route>
  //       </Routes>
  //       <Footer />
  //     </BrowserRouter>
  //   );
  // }
  // export default App;
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AppLayout from "./components/AppLayout";
import RouteProtector from "./components/RouteProtector";
import Authenticate from "./pages/Authenticate";

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
    element: <Authenticate />,
    children: [
      {
        path: "/cont-nou",
        element: <Signup />,
      },
      {
        path: "/autentificare",
        element: <Login />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
