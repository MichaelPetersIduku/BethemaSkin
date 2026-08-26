import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./components/HomePage";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { ShopPage } from "./components/ShopPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { CartPage } from "./components/CartPage";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/product/:id",
        Component: ProductDetailPage,
      },
      {
        path: "/shop",
        Component: ShopPage,
      },
      {
        path: "/cart",
        Component: CartPage,
      },
      {
        path: "/checkout",
        Component: CheckoutPage,
      },
    ],
  },
]);
