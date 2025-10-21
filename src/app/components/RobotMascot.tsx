"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RobotMascot() {
  const [text, setText] = useState("🤖 Hey there!");
  const [isMobile, setIsMobile] = useState(false);

  const messages = [
    "🤖 Hey there, human!",
    "⚙️ Working on something cool?",
    "💡 Remember — creativity never sleeps!",
    "🚀 Keep building, you’re doing great!",
    "🤔 Need a spark of inspiration?",
    "🎨 Pixels and ideas — my favorite combo!",
    "🧠 Think smarter, not harder.",
  ];

  // Detect mobile dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Text messages loop
  useEffect(() => {
    let i = 0;
    let isMounted = true;

    const loopText = async () => {
      while (isMounted) {
        setText(messages[i]);
        await new Promise((r) => setTimeout(r, 30000)); // show 30s
        setText("");
        await new Promise((r) => setTimeout(r, 5000)); // pause 5s
        i = (i + 1) % messages.length;
      }
    };

    loopText();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="fixed bottom-10 z-50 flex flex-col items-center"
      style={{ left: isMobile ? "5%" : "10%" }} // static position
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
    </div>
  );
}
