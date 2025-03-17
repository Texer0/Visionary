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
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10 7 L15 12 L10 17" />
                <path d="M15 12 H3" />

                <path d="M18 6 H22 V18 H18" />
            </svg>

        </button>
)}

export default Logout