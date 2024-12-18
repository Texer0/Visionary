function FormConteiner({ children }) {
    let sizeClass = ''
    let imgMarginBottom = ''

    if (children.type.name === 'LogInForm') {
        sizeClass = 'w-[500px] h-[520px]'
        imgMarginBottom
         = 'm-10'
    }
    else if (children.type.name === 'RegisterForm') {
        sizeClass = 'w-[530px] h-[600px]'
        imgMarginBottom = 'mb-3'
    }
    
    return (
        <div className={`bg-[#4f9eb6] shadow-[0px_0px_10px_10px_rgba(0,0,0,0.3)] rounded-[60px] content-center w-[27rem] place-items-center ${sizeClass} pb-4`}>
            <img src="src/assets/Visionary.png" alt="logo" width={500} className={`${imgMarginBottom} m-3 p-6`}/>
            {children}
        </div>
    )
}

export default FormConteiner