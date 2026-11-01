import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { AskBethemaChatbot } from "./AskBethemaChatBot";
import { RecommendationFab } from "./RecommendationFab";

export function RootLayout() {
  return (
    <>
      <Outlet />
      <RecommendationFab />
      <AskBethemaChatbot />
      <Footer />
    </>
  );
}
