import { doRequest } from './requests.js'

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

export async function cookieExist (name) {
    if (name == 'Visionary_access_token') {
        let result = await doRequest('cookies', 'GET')
        return result.exists
    } else {
        var cookie = document.cookie.split('; ').some(cookie => cookie.startsWith(`${name}=`))    
        return cookie ? true : false
    }
}


export function getCookie(name) {
    const cookie = document.cookie.split('; ').find(cookie => cookie.startsWith(`${name}=`))
    
    if (cookie) {
        const cookieData = JSON.parse(decodeURIComponent(cookie.split('=')[1]))
        if (DEBUG) {
            console.log("Cookie: ", cookie)
            console.log("Cookie Data: ", cookieData)
        }
        return cookieData
    } else {
    return null
    }
}

export async function verifyCookies() {
    let has_access_token = await cookieExist('Visionary_access_token')
    let has_user_data = await getCookie('Visionary_user_data')

    if (has_user_data && has_access_token) {
        let result = await doRequest('cookies', 'post', has_user_data)
        return (result.isValid && result.status == 200) ? true : false
    }
}