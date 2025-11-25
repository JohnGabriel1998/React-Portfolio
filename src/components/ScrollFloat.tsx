import React, { useEffect, useMemo, useRef, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    // Set initial visible state immediately so text shows first
    gsap.set(charElements, {
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      transformOrigin: '50% 0%',
      willChange: 'opacity, transform'
    });

    // Apply smooth scroll-triggered animation
    gsap.fromTo(
      charElements,
      {
        opacity: 0.3,
        yPercent: 50,
        scaleY: 1.2,
        scaleX: 0.9,
        transformOrigin: '50% 0%'
      },
      {
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        duration: animationDuration,
        ease: ease as any,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: 0.8, // Smooth scrubbing (0.8 = smoother, 1 = normal)
          onEnter: () => {
            // Make sure text is visible when entering viewport
            gsap.to(charElements, {
              opacity: 1,
              duration: 0.2,
              ease: 'power1.out'
            });
          },
          onLeave: () => {
            // Keep text visible when leaving
            gsap.set(charElements, { opacity: 1 });
          },
          onEnterBack: () => {
            // Keep text visible when scrolling back up
            gsap.set(charElements, { opacity: 1 });
          }
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;

