"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AnimateTextOnHover({ children, route }) {
  if (route) {
    return (
      <Link href={route} className="block">
        <Container>{children}</Container>
      </Link>
    );
  }

  return <Container>{children}</Container>;
}

function Container({ children }) {
  return (
    <motion.div
      className="relative max-h-max max-w-max overflow-hidden"
      initial="initial"
      whileHover="hovered"
      style={{ lineHeight: 1.2 }}
    >
      <motion.div>
        {children.split("").map((l, idx) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.85, 0, 0.15, 1],
              delay: 0.025 * idx,
            }}
            key={idx}
            className="inline-block"
          >
            {l === " " ? " " : l}
          </motion.span>
        ))}
      </motion.div>

      <motion.div className="absolute inset-0">
        {children.split("").map((l, idx) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.95, 0, 0.15, 1],
              delay: 0.025 * idx,
            }}
            key={idx}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
