import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import SuccessLottie from "@/components/SuccessLottie/SuccessLottie";
import ConfettiLottie from "@/components/ConfettiLottie/ConfettiLottie";

export default function CheckoutSuccessContainer() {
  return (
    <div>
      <SuccessLottie />

      <div className="absolute inset-0 z-10 h-full w-full">
        <ConfettiLottie />
      </div>

      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 1.3,
          type: "spring",
          stiffness: 250,
          damping: 30,
          mass: 0.2,
        }}
        className="max-h-fit overflow-hidden"
      >
        <h2 className="text-primary-orange text-4xl font-bold">
          Congratulations!
        </h2>
      </motion.div>
    </div>
  );
}
