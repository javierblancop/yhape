import React, { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not available, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '100px 0px 100px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    // Safety timeout: ensure visibility after 250ms even if observer fails in iframe
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 250);

    return () => {
      clearTimeout(safetyTimer);
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, []);

  const getTransformClasses = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0 scale-100';

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-8';
      case 'down':
        return 'opacity-0 -translate-y-8';
      case 'left':
        return 'opacity-0 translate-x-8';
      case 'right':
        return 'opacity-0 -translate-x-8';
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
