import { RouterProvider } from "react-router";
import { CartProvider } from "./contexts/CartContext";
import { router } from "./routes";
import { Toaster } from "sonner";
import { Footer } from "./components/Footer";
import { AskBethemaChatbot } from "./components/AskBethemaChatBot";

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
      <AskBethemaChatbot />
      <Footer />
    </CartProvider>
  );
}
