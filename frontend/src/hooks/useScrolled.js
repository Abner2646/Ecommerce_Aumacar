// /src/hooks/useScrolled.js

import { useState, useEffect } from 'react';

/**
 * Hook que detecta si el usuario ha scrolleado más allá de un umbral
 * @param {number} threshold - Píxeles de scroll para activar (default: 80)
 * @returns {boolean} - true si scrolleó más del threshold
 */
const useScrolled = (threshold = 80) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > threshold);
    };

    // Verificar estado inicial (por si la página carga ya scrolleada)
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};

export default useScrolled;