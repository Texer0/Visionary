import { select_query } from "./dataBase_administrator.js"

export async function validate_register(name, email) {

    var user = await select_query('user', 'id', `email = '${email}'`)
    if (user[0]) return 'The Email already exists'
    
    user = await select_query('user', 'id', `name = '${name}'`)

    if (user[0]) return 'The Name already exists'
    
    return true
}

