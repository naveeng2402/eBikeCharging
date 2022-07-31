import { Variants } from "framer-motion";

export const exitNavigationAnim: Variants = {
  hidden: {
    translateY: 10,
    opacity: 0,
    transition: { ease: "linear" },
  },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: { duration: 0.1, ease: "linear" },
  },
};
