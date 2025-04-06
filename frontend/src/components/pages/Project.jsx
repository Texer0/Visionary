import { useParams } from "react-router-dom"

import { doRequest } from "../../utils/requests"
import ListOfTasks from "./Projects/ListOfTasks/ListOfTasks"
import { useEffect, useState } from "react"
import { getCookie } from "../../utils/coockie_managment"
import { toast } from "sonner"
import { style_error, style_warning } from "../../utils/styles_warnings"
import GoBack from "../GoBack/GoBack"

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)


function Project() {
    var { id } = useParams()
    if (id.includes(':')) {
        id = id.substring(0, id.length)
    }

        const [project, setProject] = useState([])
    
        useEffect(() => {
            const askForProject = async () => {
                try {
                    const result = await doRequest(`projects/project`, 'get', { id: id})

                    if (result.status === 404) {
                        setProject([])
                        toast.warning(result.message, {
                            duration: 3000,
                            style: style_warning,
                        })
                    } else if (result.status === 500) {
                        toast.error(result.message, {
                            duration: 3000,
                            style: style_error,
                        })
                    }
                    else if (result.project) {
                        setProject(result)
                    }
                } catch (e) {
                    if (DEBUG) {
                        console.error('A problem has occurred:', e)
                    }
                }
            }
    
            askForProject()
        }, [id])

        const projectLists = project.lists || undefined
        
        const components = projectLists?.map((item, index) => (
            <ListOfTasks title={item.title} color={item.color} ></ListOfTasks>
        ))

    return (
        <>
            <GoBack to={'/projects'}/>
            <div className="text-white flex flex-row overflow-x-auto">
                {components}
            </div>
        </>
    )
}

export default Project