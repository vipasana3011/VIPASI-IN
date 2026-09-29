'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CollectionItem } from '@/config/collections';

interface CollectionCardProps {
  collection: CollectionItem;
  index: number;
  onSelect?: (id: string) => void;
}

export default function CollectionCard({ collection, index, onSelect }: CollectionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax subtle offset
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const parallaxSpeeds = [-15, 15, -10, 20];
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxSpeeds[index % 4], -parallaxSpeeds[index % 4]]
  );

  // 3D subtle tilt on desktop (max 4 deg)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    damping: 20,
    stiffness: 150,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xFromCenter = e.clientX - rect.left - width / 2;
    const yFromCenter = e.clientY - rect.top - height / 2;
    mouseX.set(xFromCenter / width);
    mouseY.set(yFromCenter / height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Subtle editorial stagger on desktop: cards 2 and 4 (index 1 & 3) sit 32px lower
  const isStaggered = index % 2 === 1;

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(collection.id);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, clipPath: 'inset(15% 0% 0% 0% round 24px 24px 16px 16px)' }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0% round 16px 16px 16px 16px)',
        transition: {
          duration: 0.9,
          delay: index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      viewport={{ once: true, margin: '-50px' }}
      className={`relative w-full ${isStaggered ? 'lg:translate-y-8' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        y: yParallax,
      }}
    >
      <motion.a
        href={collection.href}
        onClick={handleClick}
        aria-label={`Explore VIPASI ${collection.title} collection`}
        className="group block relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-vipasi-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-vipasi-champagne focus-visible:ring-offset-2"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.98 }}
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(62, 11, 16, 0.25), 0 0 0 1px rgba(223, 193, 155, 0.6)'
            : '0 10px 25px -5px rgba(62, 11, 16, 0.08), 0 0 0 1px rgba(234, 219, 204, 0.6)',
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Full-Bleed Editorial Collection Image */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={collection.image}
            alt={collection.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top"
            priority={index < 2}
          />
        </motion.div>

        {/* Soft bottom-to-transparent Wine/Ink Gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? 'linear-gradient(180deg, rgba(38,19,21,0.02) 35%, rgba(62,11,16,0.55) 70%, rgba(38,19,21,0.95) 100%)'
              : 'linear-gradient(180deg, rgba(38,19,21,0.02) 40%, rgba(62,11,16,0.45) 75%, rgba(38,19,21,0.88) 100%)',
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Animated Gold Card Border Outline on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none border border-vipasi-champagne"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Bottom Card Content */}
        <motion.div
          className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 + index * 0.1 },
          }}
          viewport={{ once: true }}
        >
          {/* Left: Label + Headline */}
          <div className="space-y-1 pr-2">
            {/* Small Category Label with tiny ✦ */}
            <div className="flex items-center space-x-1 text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-vipasi-champagne">
              <span>✦</span>
              <span>{collection.label}</span>
            </div>

            {/* Short Collection Headline in Ivory Serif */}
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-vipasi-cream leading-tight">
              {collection.title}
            </h3>
          </div>

          {/* Right: "Explore" text + circular arrow button */}
          <div className="flex items-center space-x-1.5 flex-shrink-0">
            <motion.span
              className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-vipasi-champagne hidden sm:inline"
              animate={{ x: isHovered ? 6 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Explore
            </motion.span>
            
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                isHovered
                  ? 'bg-vipasi-champagne text-vipasi-wine border-vipasi-champagne shadow-md'
                  : 'bg-white/15 text-vipasi-champagne border-white/20 backdrop-blur-xs'
              }`}
              animate={{ rotate: isHovered ? 0 : -45 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={15} />
            </motion.div>
          </div>
        </motion.div>
      </motion.a>
    </motion.div>
  );
}
