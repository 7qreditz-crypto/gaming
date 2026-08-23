import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import Preloader from "./components/Preloader";
import CustomCursor from "./components/effects/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import GamesSection from "./components/GamesSection";
import Categories from "./components/Categories";
import Trending from "./components/Trending";
import Gameverse from "./components/Gameverse";
import News from "./components/News";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import GameModal from "./components/GameModal";
import type { Game } from "./data/content";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState<Game | null>(null);

  const onDone = useCallback(() => setBooted(true), []);

  // lock scroll while the boot sequence plays
  useEffect(() => {
    if (booted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#05060a] text-slate-200 selection:bg-fuchsia-500/40">
      {/* global ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-[#05060a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(30,60,160,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_60%,rgba(120,40,200,0.12),transparent_50%)]" />
        <div className="noise absolute inset-0" />
      </div>

      <Preloader onDone={onDone} />
      <CustomCursor />

      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <main>
          <Hero />
          <Ticker />
          <GamesSection category={category} setCategory={setCategory} onView={setActive} />
          <Categories setCategory={setCategory} />
          <Trending onView={setActive} />
          <Gameverse />
          <News />
          <WhyUs />
          <Contact />
        </main>

        <Footer setCategory={setCategory} />
      </motion.div>

      <FloatingActions />
      <GameModal game={active} onClose={() => setActive(null)} />
    </div>
  );
}
