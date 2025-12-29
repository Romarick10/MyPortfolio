'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Sparkles, 
  Star, // Changed from Stars to Star
  Navigation, 
  Satellite, 
  Orbit,
  Telescope,
  Search,
  Compass,
  SatelliteDish,
  Zap, // Replaced Meteor with Zap (lightning bolt)
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotFoundPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, opacity: number, speed: number}>>([]);
  const [satellites, setSatellites] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);
  const [pulse, setPulse] = useState(0);

  // Initialize stars and satellites
  useEffect(() => {
    // Create random stars
    const newStars = Array.from({ length: 150 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.1
    }));
    setStars(newStars);

    // Create satellites
    const newSatellites = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.3 + 0.1
    }));
    setSatellites(newSatellites);

    // Pulse animation
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRetry = () => {
    window.history.back();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [
                star.opacity,
                star.opacity * 0.5,
                star.opacity,
              ],
            }}
            transition={{
              duration: 1 / star.speed,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Satellites */}
        {satellites.map((sat) => (
          <motion.div
            key={sat.id}
            className="absolute"
            style={{
              left: `${sat.x}%`,
              top: `${sat.y}%`,
            }}
            animate={{
              x: [sat.x, sat.x + 100, sat.x],
              y: [sat.y, sat.y + 50, sat.y],
              rotate: 360,
            }}
            transition={{
              duration: 20 / sat.speed,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Satellite className="h-3 w-3 text-blue-300" />
          </motion.div>
        ))}

        {/* Galactic Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Mouse Follow Glow */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
          animate={{
            x: `${mousePosition.x}vw`,
            y: `${mousePosition.y}vh`,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 15
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Error Code - Small & Magical */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-2"
        >
          <div className="relative">
            <div className="text-[8rem] md:text-[10rem] font-black tracking-tighter leading-none">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                404
              </span>
            </div>
            
            {/* Orbiting elements around 404 */}
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 60}deg) translateX(100px) rotate(-${i * 60}deg)`,
                  }}
                >
                  <Sparkles className="h-3 w-3 text-blue-300" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Subtitle - Very Small */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-center"
        >
          <h2 className="text-xs md:text-sm font-light tracking-[0.3em] uppercase text-slate-400 mb-3">
            Galactic Navigation Error
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            <Star className="h-3 w-3 text-blue-300" />
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            The cosmic coordinates you requested cannot be located in our universal database.
          </p>
        </motion.div>

        {/* Search Signal Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mb-12"
        >
          <div className="relative w-48 h-48">
            {/* Radar circles */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 border border-blue-400/20 rounded-full"
                style={{
                  margin: `${ring * 24}px`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  delay: ring * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Center satellite dish */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <SatelliteDish className="h-12 w-12 text-blue-400" />
              </motion.div>
            </div>

            {/* Scanning line */}
            <motion.div
              className="absolute top-0 left-1/2 w-px h-full origin-top"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-1/2 bg-gradient-to-b from-blue-400/50 via-blue-400 to-transparent" />
            </motion.div>

            {/* Pulsing dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 2, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Error Details - Tiny Font */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12 text-center max-w-lg"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-slate-800/30 backdrop-blur-sm rounded-full border border-slate-700/50">
            <Telescope className="h-2.5 w-2.5 text-blue-300" />
            <code className="text-[0.65rem] text-slate-400 font-mono">
              ERROR_CODE: 0x1A3F7C9E • STATUS: LOST_IN_SPACE
            </code>
          </div>
          <p className="text-[0.7rem] text-slate-500 leading-relaxed mb-4">
            Our deep space probes have scanned the requested sector, but the destination appears to have 
            either drifted into a wormhole or was never charted in our stellar maps. The quantum 
            navigation system indicates a probability of 99.7% that this location does not exist 
            within our current dimensional plane.
          </p>
          <div className="flex items-center justify-center gap-3 text-[0.65rem] text-slate-600">
            <span className="flex items-center gap-1">
              <Navigation className="h-2.5 w-2.5" />
              COORDINATES: UNKNOWN
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Orbit className="h-2.5 w-2.5" />
              ORBIT: UNDETECTED
            </span>
          </div>
        </motion.div>

        {/* Action Buttons - Small */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/" passHref>
            <Button
              size="sm"
              className="h-8 px-4 text-xs bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-700 hover:to-purple-700 backdrop-blur-sm border border-blue-500/20"
            >
              <Home className="mr-2 h-3 w-3" />
              Return to Homebase
            </Button>
          </Link>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleRetry}
            className="h-8 px-4 text-xs border-slate-700/50 bg-slate-900/30 hover:bg-slate-800/50 backdrop-blur-sm"
          >
            <Compass className="mr-2 h-3 w-3" />
            Retrace Coordinates
          </Button>

          <Link href="/contact" passHref>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-4 text-xs text-slate-400 hover:text-white hover:bg-slate-800/30 backdrop-blur-sm"
            >
              <Search className="mr-2 h-3 w-3" />
              Report Anomaly
            </Button>
          </Link>
        </motion.div>

        {/* Technical Details - Very Small */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 pt-6 border-t border-slate-800/30"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-1.5 w-1.5 rounded-full",
                pulse > 50 ? "bg-green-400 animate-pulse" : "bg-red-400"
              )} />
              <span className="text-[0.6rem] text-slate-600 font-mono">
                CONNECTION: {pulse > 50 ? "ACTIVE" : "DEGRADED"}
              </span>
            </div>
            <div className="text-[0.6rem] text-slate-600 font-mono">
              TIMESTAMP: {new Date().toISOString().split('T')[0].replace(/-/g, '.')}
            </div>
            <div className="text-[0.6rem] text-slate-600 font-mono">
              VERSION: NEXTJS_15.5.9
            </div>
          </div>
        </motion.div>

        {/* Floating Shooting Stars (replaced meteors) */}
        <AnimatePresence>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: -100,
                y: Math.random() * 100,
                opacity: 0 
              }}
              animate={{ 
                x: "100vw",
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 3
              }}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-blue-300/50" />
                <div className="h-px w-16 bg-gradient-to-r from-blue-300/50 to-transparent" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="text-[0.5rem] text-slate-700 font-mono tracking-widest uppercase">
          INTERSTELLAR NAVIGATION SYSTEM v2.1
        </div>
      </motion.div>
    </div>
  );
}