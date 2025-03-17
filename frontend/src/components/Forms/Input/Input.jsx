import React from 'react'

const Input = React.forwardRef(({ value, className, onChange, placeholder, type = "text", ...props }, ref) => {
    return (
        <input 
            type={type} 
            placeholder={placeholder}
            ref={ref} 
            className={`border-solid border w-80 h-12 rounded-2xl pl-6 m-3 ${className || ''}`}
            {...props}
        />
    )
})

export default Input
