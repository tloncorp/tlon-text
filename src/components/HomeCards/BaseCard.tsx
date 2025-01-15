import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, useAnimation } from 'framer-motion';
import type { HomeCard } from '../../utils/types';

interface BaseCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
  children: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({ isTopCard, index, children }) => {
  const ref = useRef(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isTopCard ? [1, 1, 0.75] : [0.45, 1, 0.75]
  );

  const shadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0px 2px 4px rgba(0,0,0,0.25)",
      "0px 220px 80px rgba(0,0,0,0.1)",
      "0px 2px 4px rgba(0,0,0,0.25)"
    ]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start({ opacity: 1, y: 0 });
    }, 300 * index);

    return () => clearTimeout(timeout);
  }, [controls, index]);

  return (
    <motion.div 
      ref={ref} 
      className="card w-full rounded-2xl overflow-hidden relative mb-[12vh] aspect-[3/4] md:aspect-square"
      style={{ scale, boxShadow: shadow }}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default BaseCard;