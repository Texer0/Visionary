import { cookieExist, getCookie, verifyCookies } from '../../utils/coockie_managment'

import { useCookies } from 'react-cookie'
import { doRequest } from '../../utils/requests'
import { useNavigate } from 'react-router-dom'


function Logo() {
    const [cookies, setCookie, removeCookie] = useCookies(["Visionary_token"])
    const deleteCoockies = () => {
        removeCookie('Visionary_access_token')
        removeCookie('Visionary_user_data')
    }

    const doSomething = async () => {
        console.log(cookies)
            try {

        var userData = getCookie('Visionary_user_data')
        result = await doRequest('bd_request/projects', 'POST', userData)
        console.log(result)

    } catch (e) {
        console.error('A problem has occurred:', e)
    }
    }

    return (
        <div>
            <img src="../../src/assets/Visionary_logo.png" alt="Visionary Logo" width={70} className="absolute top-5 left-10"/>
            <button onClick={deleteCoockies}>Delete Coockies</button>
            <button onClick={doSomething}>Pruebas</button>
        </div>
)}

export default Logo