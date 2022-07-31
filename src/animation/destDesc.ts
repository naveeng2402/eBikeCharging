import { Variants } from "framer-motion";

export const destDescAnim: Variants = {
  hidden: {
    translateY: -10,
    opacity: 0,
    transition: { ease: "linear" },
  },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: { ease: "linear" },
  },
};
