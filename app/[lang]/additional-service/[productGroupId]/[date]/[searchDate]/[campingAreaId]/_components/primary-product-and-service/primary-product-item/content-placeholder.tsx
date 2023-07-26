"use client";

import { motion, AnimatePresence } from "framer-motion";
import { duration } from "./animation-config";

interface ContentPlaceholderProps {
  isOpened: boolean;
  children: React.ReactNode;
}

function ContentPlaceholder({ isOpened, children }: ContentPlaceholderProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpened && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          <motion.div
            variants={{ collapsed: { opacity: 0 }, open: { opacity: 1 } }}
            transition={{ duration }}
            className="content-placeholder"
          >
            {children}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export { ContentPlaceholder };
