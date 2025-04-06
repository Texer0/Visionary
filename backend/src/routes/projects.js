import express from 'express'
import dotenv from 'dotenv'

import { select_query, insert_into_query, delete_query, update_query } from '../utils/dataBase_administrator.js'

dotenv.config({ path: '../.env' })

const DEBUG = process.env.DEBUG

const route_projects = express.Router()

route_projects.get('/', async (req, res) => {
    const email = req.body.email
	
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
        res.send({ status: 500, message: 'Internal server Error'})
    }
})


route_projects.post('/new_project', async (req, res) => {
    const { title, description, link, email } = req.body

    try {
        var hash = await select_query('user', 'hash', `email = '${email}'`)
        hash = hash[0].hash
        
        const userProjects = await select_query('user_has_project', 'project_id', `user_hash = '${hash}'`)

        for (const userProject of userProjects) {
            const storedTitle = await select_query('project', 'title', `id = ${userProject.project_id}`)
            if (storedTitle[0].title === title) {
                return res.send({ status: 409, message: 'The project already exists' })
            }
        }

        await insert_into_query('project', 'title, description, link', `'${title}', '${description}', '${link}'`)
        
        var project_id = await select_query('project', 'id', `title = '${title}'`)
        project_id = project_id[0].id
        
        await insert_into_query('user_has_project', 'project_id, user_hash', ` ${project_id}, '${hash}'`)

        const defaultLists = [
            { title: 'Stage', color: '#FF1200'}, 
            { title: 'In progress', color: '#aaaa11'},
            { title: 'Completed', color: '#216E4E'}
        ]

        for (const defaultList of defaultLists) {
            await insert_into_query('list', 'title, color, project_id', `'${defaultList.title}', '${defaultList.color}', ${project_id}`)
        }
        
        res.send({ status: 201, id: project_id })
    } catch (err) {
        if (DEBUG) {
            console.log("Error while creating the project", err)
        }
        res.send({ status: 500, message: "Error while creating the project" })
    }
})


route_projects.get('/project', async (req, res) => {
    const { id } = req.body

    try {        
        const project = await select_query('project', '*', `id = ${id}`)
        const lists = await select_query('list', 'id, title, color', `project_id = ${id}`)

        res.send({ status: 200, project: project, lists: lists })

    } catch (err) {
        if (DEBUG) {
            console.log(err)
        }
        res.send({ status: 500, message: 'Internal server Error' })
    }
})


 
route_projects.delete('/', async (req, res) => {
    const { email, projects_id } = req.body

    try {
        var hash = await select_query('user', 'hash', `email = '${email}'`)
        hash = hash[0].hash

        for (const project_id of projects_id) {
            await delete_query('user_has_project', `user_hash = '${hash}' and project_id = ${project_id}`)
            await delete_query('project', `id = ${project_id}`)

            var listsIds = await select_query('list', 'id', `project_id = ${project_id}`)
            console.log(listsIds)

            for (const list_id of listsIds) {
                await delete_query('task', `list_id = ${list_id.id}`)
            }

            await delete_query('list', `project_id = ${project_id}`)
        }
        
        res.send({ status: 201, message: 'Project/s deleted correctly' })

    } catch (err) {
        if (DEBUG) {
            console.log(err)
        }
        res.send({ status: 500, message: 'Internal server Error' })
    }
})


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