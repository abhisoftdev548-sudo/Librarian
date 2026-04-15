import { motion } from "motion/react"; // v12 ke liye updated import

interface Props {
  children: React.ReactNode;
  delay?: number; // Extra prop line-by-line aane ke liye
}

export const Reveal = ({ children, delay = 0.2 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.2 }} 
      // Delay ko transition mein add kar diya
      transition={{ duration: 0.6, ease: "easeOut", delay: delay }} 
    >
      {children}
    </motion.div>
  );
};