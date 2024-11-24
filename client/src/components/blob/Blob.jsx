import { motion } from "framer-motion";

function Blob({ svgPath, style }) {
  return (
    <motion.img
      src={svgPath}
      alt="Blob"
      className="w-[200px] h-auto"
      style={style}
      animate={{
        x: ["0%", "50%", "0%"],
        y: ["0%", "50%", "0%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
}

export default Blob;
