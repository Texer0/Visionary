import { useParams } from "react-router-dom"

import { doRequest } from "../../utils/requests"
import ListOfTasks from "../ListOfTasks/ListOfTasks"
import { useEffect, useState } from "react"
import { getCookie } from "../../utils/coockie_managment"

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)


function Project() {
    const { id } = useParams()

        const [project, setProject] = useState([])
    
        useEffect(() => {
            const askForProject = async () => {
                try {
                    var userData = getCookie('Visionary_user_data')
                    const result = await doRequest(`projects/project`, 'POST', { ...userData, id: id})
                    console.log("RESULT IN FRONTEND => ", result)

                    // if (result.status === 404) {
                    //     setProject([])
                    //     //  toast
                    // } else if (result.project) {
                    //     setProject(result.project)
                    // }
                } catch (e) {
                    if (DEBUG) {
                        console.error('A problem has occurred:', e)
                    }
                }
            }
    
            askForProject()
        }, [id])
    
        console.log("Project: ", project)

    let listsAmount = [
        { title: 'Stage', color: '#FF1200'}, 
        { title: 'In progress', color: '#aaaa11'},
        { title: 'Completed', color: '#216E4E'}
    ]

    const components = listsAmount.map((item, index) => (
        <ListOfTasks title={item.title} color={item.color} ></ListOfTasks>
      ))

    return (
        <div className="text-white flex flex-row overflow-x-auto">
            {components}
        </div>
    )
}

export default Project