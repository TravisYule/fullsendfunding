import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const useReanimateOnScroll = (threshold = 0.2) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: false  // This ensures it can trigger multiple times
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');  // This resets the animation when out of view
    }
  }, [controls, inView]);

  return [ref, controls];
}; 