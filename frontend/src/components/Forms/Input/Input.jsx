import React from 'react'

const Input = React.forwardRef(({ value, className, onChange, placeholder, type = "text", ...props }, ref) => {
    return (
        <input 
            type={type} 
            placeholder={placeholder}
            ref={ref} 
            className={`border-solid border w-[300px] h-[50px] rounded-[20px] pl-4 m-3 ${className || ''}`}
            {...props}
        />
    )
})

export default Input
