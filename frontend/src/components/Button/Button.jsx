import { Link } from "react-router-dom"

function Button({children, toPage}) {
    return (
        <Link to={toPage}>
            <button className='p-1 w-[200px] h-[60px] rounded-[20px] text-2xl bg-[#48BEBC] text-white'
            type="submit">{children}</button>
        </Link>
    )
}

export default Button