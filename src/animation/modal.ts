export const overlay = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};
export const panel = {
  initial: {
    translateY: "100%",
  },
  hidden: {
    translateY: "100%",
    opacity: 0,
    transition: { duration: 0.2, ease: "linear" },
  },
  animate: {
    translateY: "0%",
    opacity: 1,
    transition: { duration: 0.3, ease: "linear" },
  },
};
