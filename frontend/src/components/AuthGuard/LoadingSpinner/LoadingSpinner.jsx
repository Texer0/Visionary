import { motion } from "framer-motion"

const LoadingSpinner = () => {
    return (
        <div className="relative w-24 h-24">
            <motion.svg 
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                width="80" height="80" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" stroke="#fff"
                    strokeDasharray="10" strokeDashoffset="0" strokeLinecap="round" />
            </motion.svg>

            <motion.svg 
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                width="80" height="80" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="10" fill="none" strokeWidth="5" stroke="#fff"
                    strokeDasharray="10" strokeDashoffset="0" strokeLinecap="round" />
            </motion.svg>
        </div>
    )
}

export default LoadingSpinner
