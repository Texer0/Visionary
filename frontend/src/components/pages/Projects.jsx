import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import ProjectCard from "../ProjectCard/ProjectCard"
import Button from "../Button/Button"
import { getCookie } from "../../utils/coockie_managment"
import { doRequest } from "../../utils/requests"

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

function Projects() {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    
    const [projectsFromUser, setProjectsFromUser] = useState([])

    useEffect(() => {
        const askForProjects = async () => {
            try {
                var userData = getCookie('Visionary_user_data')
                const result = await doRequest('projects', 'POST', userData)
                
                if (result.status === 404) {
                    setProjectsFromUser([])
                } else if (result.data) {
                    setProjectsFromUser(result.data)
                }
            } catch (e) {
                if (DEBUG) {
                    console.error('A problem has occurred:', e)
                }
            }
        }

        askForProjects()
    }, [])

    console.log("Projects: ", projectsFromUser)

    const projects = projectsFromUser.map((project, index) => ({
        name: project.title || `Project ${index + 1}`,
        link: project.link,
        id: project.id
    }))

    const totalPages = Math.ceil(projects.length / itemsPerPage)
    const currentItems = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="w-4/6 m-auto">
            <div>
                {projects.length > 0 ? (
                    <section className="flex flex-wrap justify-center">
                        {currentItems.map((item) => (
                            <Link key={item.id} to={`/project/${item.id}`}>
                                <ProjectCard name={item.name} />
                            </Link>
                        ))}
                    </section>
                ) : (
                    <Button toPage="/new_project">New project</Button>
                )}
            </div>
            {projects.length >= itemsPerPage + 1 && (
                <div className="space-x-1 absolute bottom-32 right-[50%] transform translate-x-1/2 translate-y-1/2">
                    <button disabled={currentPage === 1} className="hover:bg-slate-300"
                    onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </button>
                    <button disabled={currentPage === totalPages} className="hover:bg-slate-300"
                    onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default Projects
