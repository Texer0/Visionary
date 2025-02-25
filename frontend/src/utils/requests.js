export const doRequest = async (url, method, data) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL + `/${url}`
    const DEBUG = import.meta.env.VITE_DEBUG

    const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    if (!validMethods.includes(method.toUpperCase())) {
        throw new Error(`Unsupported HTTP method: ${method}`)
    }

    const body = method.toUpperCase() === 'POST' || method === 'PUT' || method === 'PATCH' ? JSON.stringify(data) : undefined

    try {
        const response = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const responseData = await response.json().catch(error => {
            throw new Error('Invalid JSON response')
        })

        return responseData
    } catch (error) {
        if (DEBUG) {
            console.error(`An error occurred while requesting ${url} with method ${method}`, error)
        }
    } finally {
        if (DEBUG) {
            console.log("Data: ", data)
            console.log("Body: ", body)
        }
    }
}
