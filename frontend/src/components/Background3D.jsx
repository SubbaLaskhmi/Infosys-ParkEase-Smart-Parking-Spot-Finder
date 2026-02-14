import React from 'react';
import { motion } from 'framer-motion';

const Background3D = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#0a0a0e]">
            {/* Deep Space Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0e] to-[#0a0a0e]" />

            {/* Animated Mesh Blobs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                    rotate: [0, -180, -360]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, 100, 0],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen"
            />

            {/* Grid Overlay for 3D Technical Feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

            {/* Floating Particles/Stars */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: Math.random(),
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [null, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Background3D;
