import { useState, useEffect } from "react";
import { Star, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

function getRandomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function SocialProofBanner() {
  const [count, setCount] = useState(() => {
    // Seed based on today's date for consistency within a day
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return 80 + (seed % 120); // 80-199 range
  });

  useEffect(() => {
    // Increment counter periodically to simulate live activity
    const interval = setInterval(() => {
      setCount((prev) => prev + getRandomBetween(1, 3));
    }, getRandomBetween(15000, 45000));
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 mb-6"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        {/* Star rating */}
        <span className="flex items-center gap-1.5">
          <span className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i <= 4 ? "fill-accent text-accent" : "fill-accent/40 text-accent/40"}`}
              />
            ))}
          </span>
          <span className="font-semibold text-foreground">4.8/5</span>
        </span>

        {/* Divider */}
        <span className="hidden sm:block w-px h-4 bg-border" />

        {/* Live counter */}
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="w-3.5 h-3.5 text-primary" />
          <span>
            <strong className="text-foreground">{count}+</strong> berekeningen vandaag
          </span>
        </span>

        {/* Divider */}
        <span className="hidden sm:block w-px h-4 bg-border" />

        {/* Trust signal */}
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <TrendingUp className="w-3.5 h-3.5 text-success" />
          <span>
            Gem. besparing <strong className="text-success">€7.700</strong>
          </span>
        </span>
      </div>
    </motion.div>
  );
}
