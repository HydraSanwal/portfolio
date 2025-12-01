"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RobotMascot() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
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
    "🎵 Hum a tune while coding, trust me!",
    "🕹️ Games later? First, let's make magic here!",
    "☕ Don’t forget to take a break, human!",
    "🌌 Imagination is your superpower!",
    "💾 Backup your work before chaos strikes!",
    "🐱 Robots love cats too… kinda.",
  ];

  // Detect mobile dynamically
  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Text messages loop
  useEffect(() => {
    if (!mounted) return;
    let i = 0;
    let isMountedLoop = true;

    const loopText = async () => {
      while (isMountedLoop) {
        setText(messages[i]);
        await new Promise((r) => setTimeout(r, 30000));
        setText("");
        await new Promise((r) => setTimeout(r, 5000));
        i = (i + 1) % messages.length;
      }
    };

    loopText();
    return () => {
      isMountedLoop = false;
    };
  }, [mounted]);

  if (!mounted) return null; // prevent SSR render

  // Double-click handler
  const handleDoubleClick = () => {
    router.push("/typing"); // make sure this page exists
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="fixed bottom-10 z-50 flex flex-col items-center cursor-pointer"
      style={{ left: isMobile ? "5%" : "10%" }} // completely still
    >
      {text && (
        <div className="bg-white/80 text-black px-3 py-1 rounded-xl mb-2 shadow-md text-sm font-medium">
          {text}
        </div>
      )}
      <Image
        src="/robot.gif"
        alt="Robot Mascot"
        width={145}
        height={145}
        unoptimized
        priority
        className="drop-shadow-lg"
      />
    </div>
  );
}
