"use client";

import typingAnimation from "/public/lottie/Typing Animation.json";
import Lottie from "react-lottie";

export default function TypingLottie() {
  const lottieSettings = {
    loop: true,
    autoplay: true,

    animationData: typingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={lottieSettings} speed={0.5} />;
}
