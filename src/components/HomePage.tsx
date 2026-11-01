import { Hero } from "../components/Hero";
import { BestSellers } from "../components/BestSellers";
import { GuidedFour } from "../components/GuidedFour";
import { RealResults } from "../components/RealResults";
import { InstagramFeed } from "../components/InstagramFeed";
import { Contact } from "../components/Contact";
import { Newsletter } from "../components/Newsletter";
import { MarqueeBanner } from "../components/MarqueeBanner";
import { Toaster } from "sonner";
import { Header } from "./Header";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      {/* Marquee Banner */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MarqueeBanner />
      </div>
      <Header offsetForMarquee />

      {/* Main Content */}
      <main className="pt-[124px]">
        <Hero />
        <BestSellers />
        <GuidedFour />
        <RealResults />
        {/* <InstagramFeed /> */}
        <Contact />
        <Newsletter />
      </main>
    </div>
  );
}
