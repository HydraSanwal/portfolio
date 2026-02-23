"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RobotMascot() {
  const [rightOffset, setRightOffset] = useState("3%");
  const [robotSize, setRobotSize] = useState({ width: 110, height: 110 });
  const [textSize, setTextSize] = useState("text-sm");

  // Update size and right offset based on screen width
  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // MOBILE
        setRightOffset("1%");
        setRobotSize({ width: 110, height: 110 });
        setTextSize("text-sm");
      } else {
        // DESKTOP/LAPTOP
        setRightOffset("3%");
        setRobotSize({ width: 160, height: 160 }); // bigger robot
        setTextSize("text-base"); // bigger text
      }
    };

    updateSizes(); // initial check
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  return (
    <motion.div
      className="fixed bottom-10 z-50 flex flex-col items-end"
      style={{ right: rightOffset }}
    >
      {/* Static text */}
      <div
        className={`bg-white/80 text-black px-3 py-1 rounded-xl mb-2 shadow-md font-medium ${textSize} text-right`}
      >
        Hey there! I'm your mini guide
      </div>

      {/* Robot image */}
      <Image
        src="/testrobo.gif"
        alt="Robot Mascot"
        width={robotSize.width}
        height={robotSize.height}
        unoptimized
        priority
        className="drop-shadow-lg cursor-pointer"
      />
    </motion.div>
  );
}