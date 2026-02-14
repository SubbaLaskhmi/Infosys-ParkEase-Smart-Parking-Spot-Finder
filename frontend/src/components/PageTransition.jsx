import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(2px)" }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] // "Swift Out" easing for premium feel
            }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
