import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import UserProvider from './Context/User.context';
import CartProvider from './Context/Cart.context';
import WishListProvider from './Context/WishList.context';
import Layout from './Components/Layout/Layout';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Navbar from './Components/Navbar/Navbar';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Cart from './Pages/Cart/Cart';
import Checkout from "./Pages/Checkout/Checkout";
import AllOrders from './Pages/AllOrders/AllOrders';
import Products from './Pages/Products/Products';
import Categories from './Pages/Categories/Categories';
import SubCategories from './Pages/SubCategory/SubCategory';
import Brands from './Pages/Brands/Brands';
import WishList from './Pages/WishList/WishList';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Brands /> },
        { path: "categories/:id/subcategories", element: <SubCategories /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishList", element: <WishList /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "/products", element: <Products /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "*", element: <NotFound /> },
      ]
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> }
      ]
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CartProvider>
            <WishListProvider>
              <RouterProvider router={routes} />
            </WishListProvider>
            <ReactQueryDevtools />
            <Toaster />
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
