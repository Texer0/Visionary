import express from 'express'
import dotenv from 'dotenv'

import { select_query, insert_into_query, delete_query, update_query } from '../utils/dataBase_administrator.js'

dotenv.config({ path: '../.env' })

const DEBUG = process.env.DEBUG

const route_projects = express.Router()

route_projects.post('/', async (req, res) => {
    const email = req.body.email
    
    console.log(email)
	
    try {
        const user = await select_query('user', '*', `email = '${email}'`)
        
        if (!user) {
            res.send({ status: 404, message: 'User not found' })
        }
        
        const result = await select_query('user_has_project', 'project_id', `user_hash = '${user[0].hash}'`)
        
        if (!result[0]) {
            return res.send({ status: 404, message: 'User has not projects'})
        }
        
        var projects = []
        
        for (const project of result) {
            const stored_project = await select_query('project', '*', `id = '${project.project_id}'`)
            projects.push(stored_project[0])
        }
        res.send({ status: 200, data: projects })

    } catch (err) {
        if (DEBUG) {
            console.log(err)
        }
    }
})


route_projects.post('/new_project', async (req, res) => {
    const { title, description, link, email } = req.body

    try {
        var hash = await select_query('user', 'hash', `email = '${email}'`)
        hash = hash[0].hash

        await insert_into_query('project', 'title, description, link', `'${title}', '${description}', '${link}'`)
        
        var project_id = await select_query('project', 'id', `title = '${title}'`)
        project_id = project_id[0].id
        
        console.log(title, description, link, project_id)
        await insert_into_query('user_has_project', 'project_id, user_hash', ` ${project_id}, '${hash}'`)
        
        res.send({ status: 201, id: project_id })
    } catch (err) {
        if (DEBUG) {
            console.log("Error while creating the project", err)
        }
        return res.send({ status: 500, message: "Error while creating the project" })
    }
})


route_projects.post('/project', async (req, res) => {
    const { email, id } = req.body
    
    try {
        var hash = await select_query('user', 'hash', `email = '${email}'`)
        hash = hash[0].hash
        
        const result = await select_query('user_has_project', 'project_id', `user_hash = '${hash}'`)
        
        console.log("Result in backend", result)
        
        for (const project_id of result) {
            if (project_id.project_id === parseInt(id)) {
                const project = await select_query('project', '*', `id = ${id}`)
                return res.send({ status: 200, project: project[0] })
            }
        }
        
        return res.send({ status: 404, message: 'Project not found' })
        // lists
        // tasks of list
    } catch (err) {
        if (DEBUG) {
            console.log(err)
        }
        return res.send({ status: 500, message: 'Internal server Error' })
    }
})


 
// route_projects.delete('/delete_projects', async (req, res) => {
//     const user = req.session.user
//     const { project_id } = req.body

//     await delete_query('user_has_project', `user_hash = '${user.hash}' and project_id = ${project_id}`)
//     await delete_query('project', `id = ${project_id}`)
    
//     res.status(201)
//     res.redirect('/home')
// })


// route_projects.patch('/change_projects', async (req, res) => {
//     // Modify proyects
//     const user = req.session.user
//     const { project_id, columns, new_data } = req.body

//     console.log("project_id: " + project_id) // wich modify
//     console.log("columns: " + columns)       // what to modify
//     console.log("new_data: " + new_data)     // what to put intead

//     // await update_query('project', `${columns}`, `${new_data}`, `id = ${project_id}`)

//     // return res.redirect('/project/:id').status(201)
// })







export default route_projects