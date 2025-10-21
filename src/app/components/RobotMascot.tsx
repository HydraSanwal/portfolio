"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RobotMascot() {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("🤖 Hey there!");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true); // now we know we are on the client
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mounted) return; // do not run text loop until mounted
    let i = 0;
    let isMounted = true;

    const loopText = async () => {
      while (isMounted) {
        setText(["🤖 Hey there!", "⚙️ Working on something cool?", "💡 Creativity never sleeps!"][i]);
        await new Promise((r) => setTimeout(r, 30000));
        setText("");
        await new Promise((r) => setTimeout(r, 5000));
        i = (i + 1) % 3;
      }
    };

    loopText();
    return () => {
      isMounted = false;
    };
  }, [mounted]);

  if (!mounted) return null; // prevent SSR render

  return (
    <div
      className="fixed bottom-10 z-50 flex flex-col items-center"
      style={{ left: isMobile ? "5%" : "10%" }}
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
