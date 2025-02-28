import { useCookies } from 'react-cookie'

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

function Logout() {
    const [cookies, setCookie, removeCookie] = useCookies(["Visionary_access_token", 'Visionary_user_data'])
    const deleteCoockies = () => {
        try {
            removeCookie('Visionary_access_token')
            removeCookie('Visionary_user_data')
            window.location.reload()
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