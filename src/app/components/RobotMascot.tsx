"use client";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function RobotMascot() {
  const controls = useAnimation();
  const [text, setText] = useState("🤖 Hey there!");

  const messages = [
    "🤖 Hey there, human!",
    "⚙️ Working on something cool?",
    "💡 Remember — creativity never sleeps!",
    "🚀 Keep building, you’re doing great!",
    "🤔 Need a spark of inspiration?",
    "🎨 Pixels and ideas — my favorite combo!",
    "🧠 Think smarter, not harder.",
  ];

  useEffect(() => {
    const move = async () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) return; // skip movement on mobile

      const screenWidth = window.innerWidth;
      const leftLimit = screenWidth * 0.1;  // 10% from left
      const rightLimit = screenWidth * 0.9; // 10% from right

      while (true) {
        // Move right
        await controls.start({
          x: rightLimit - leftLimit,
          transition: { duration: 24, ease: "easeInOut" }, // slower
        });
        await new Promise((r) => setTimeout(r, 2000)); // pause

        // Move left
        await controls.start({
          x: 0,
          transition: { duration: 24, ease: "easeInOut" },
        });
        await new Promise((r) => setTimeout(r, 2000)); // pause
      }
    };
    move();
  }, [controls]);

  useEffect(() => {
    let i = 0;
    const loopText = async () => {
      while (true) {
        setText(messages[i]);
        await new Promise((r) => setTimeout(r, 30000)); // show 30s
        setText("");
        await new Promise((r) => setTimeout(r, 5000)); // pause 5s
        i = (i + 1) % messages.length;
      }
    };
    loopText();
  }, []);

  return (
    <motion.div
      className={`fixed bottom-10 z-50 flex flex-col items-center 
        ${typeof window !== "undefined" && window.innerWidth < 768 ? "left-[20%]" : "left-[10%]"}
      `}
      animate={controls}
    >
      {text && (
        <div className="bg-white/80 text-black px-3 py-1 rounded-xl mb-2 shadow-md text-sm font-medium">
          {text}
        </div>
      )}
      <Image
        src="/robot.gif"
        alt="Robot Mascot"
        width={110}
        height={110}
        unoptimized
        priority
        className="drop-shadow-lg"
      />
    </motion.div>
  );
}
