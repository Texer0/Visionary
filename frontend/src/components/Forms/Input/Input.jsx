import React from 'react'

const Input = ({ className, ...props }) => {
    return (
        <input
            className={`border-solid border w-80 h-12 rounded-2xl pl-6 m-3 ${className || ''}`}
            {...props}
        />
    )
}


export default Input