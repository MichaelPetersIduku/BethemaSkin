import { createBrowserRouter } from "react-router";
import { HomePage } from "./components/HomePage";
import { ProductDetailPage } from "./components/ProductDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/product/:id",
    Component: ProductDetailPage,
  },
]);
