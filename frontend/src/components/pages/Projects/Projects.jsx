import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import Button from "../../Button/Button"
import ProjectCard from './ProjectCard/ProjectCard'
import { getCookie } from "../../../utils/coockie_managment"
import { doRequest } from "../../../utils/requests"
import { style_error } from "../../../utils/styles_warnings"
import Input from "../../Forms/Input/Input"

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
                } else if (result.status === 500) {
                    toast.error(result.message, {
                        duration: 3000,
                        style: style_error,
                    })
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
        <div className="flex flex-col h-screen w-screen">
            <div className="ml-auto mt-10 mr-10 mb-4">
                <Input className="rounded-3xl w-72" placeholder='Search...' ></Input>
            </div>
            <div className="w-fit h-10 rounded-3xl flex flex-row-reverse gap-8 ml-auto">
                <button className="bg-[#48BEBC] p-0 w-10 mr-24">
                    <svg id="trash-icon" width="40" height="40" className="p-1" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                    </svg>
                </button>
  
                <button className="bg-[#48BEBC] p-0 w-10">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="p-0.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2"></polygon>
                    </svg>
                </button>

                <button className="bg-[#48BEBC] p-0 w-10">
                    <svg width="40" height="40" viewBox="0 0 24 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>











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
                        <Button toPage="/new_project" className="">Start a new project</Button>
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
        </div>
    )
}

export default Projects
