import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)


function Logout() {
    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(["Visionary_token"])
    const deleteCoockies = () => {
        try {
            removeCookie('Visionary_access_token')
            removeCookie('Visionary_user_data')
            navigate('/login')
        } catch (err) {
            if (DEBUG) {
                console.log("An error has ocurred while removing cookies", err)
            }
        }
    }

    return (
        <button onClick={deleteCoockies} className="absolute top-10 right-10 bg-transparent" width={70}>
            <img src="../../src/assets/logout.png" alt="Logout"/>
        </button>
)}

export default Logout