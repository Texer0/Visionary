import { Link } from "react-router-dom"

function GoBack({ to }) {
    return (
        <Link to={to}>
            <button className="flex items-center bg-transparent absolute top-2 left-2">
                <img src="../../src/assets/left_arrow.svg" alt="GoBack" className="w-10 h-10 bg-none"/>
            </button>
        </Link>
    )
}

export default GoBack