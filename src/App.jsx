import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLAyout from "./layout/RootLAyout";
import StoreLayout from "./layout/StoreLayout";
import PolicyLayout from "./layout/PolicyLayout";
import GlobalProvider from "./context/GlobalContext";

import Hero from "./pages/Hero";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AllProducts from "./pages/AllProducts";
import MenProducts from "./pages/MenProducts";
import WomenProducts from "./pages/WomenProducts";
import KidProducts from "./pages/KidProducts";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShoppingPolicy from "./pages/ShoppingPolicy";

import PageNotFound from "./pages/PageNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <GlobalProvider>
          <RootLAyout />
        </GlobalProvider>
      ),
      errorElement: <PageNotFound />,
      children: [
        { path: "/", element: <Hero /> },
        { path: "/about", element: <About /> },
        {
          path: "/store",
          element: <StoreLayout />,
          children: [
            { path: "/store/all-products", element: <AllProducts /> },
            { path: "/store/men", element: <MenProducts /> },
            { path: "/store/women", element: <WomenProducts /> },
            { path: "/store/kid", element: <KidProducts /> },
          ],
        },
        {
          element: <PolicyLayout />,
          children: [
            { path: "/policy/privacy-policy", element: <PrivacyPolicy /> },
            { path: "/policy/shopping-policy", element: <ShoppingPolicy /> },
          ],
        },
        { path: "/contact", element: <Contact /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
