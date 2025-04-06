import { useEffect, useState } from "react"
import { toast } from "sonner"

import ProjectCard from './ProjectCard/ProjectCard'
import { getCookie } from "../../../utils/coockie_managment"
import { doRequest } from "../../../utils/requests"
import { style_error } from "../../../utils/styles_warnings"
import Input from "../../Forms/Input/Input"
import GoBack from "../../GoBack/GoBack"
import NewProject from "./NewProject/NewProject"

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

function Projects() {
    const [currentPage, setCurrentPage] = useState(1)
    const [projectsFromUser, setProjectsFromUser] = useState([])
    const [showNewProject, setShowNewProject] = useState(false)
    const [reload, setReload] = useState(0)
    const [reloadDeleteds, setreloadDeleteds] = useState(0)
    const [activeMode, setActiveMode] = useState(null)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)


    const handleClick = (mode) => {
        setActiveMode(activeMode === mode ? null : mode)
    }

    const handleDeleteConfirm = () => {
        setShowConfirmDelete(true)
    }

    const handleAskDelteButton = async (election) => {
        if (!election) {
            return setShowConfirmDelete(false)
        }

        setShowConfirmDelete(false)
        setActiveMode(null)

        var toDelete = JSON.parse(localStorage.getItem("toDelete")) || []
        localStorage.setItem("toDelete", JSON.stringify([]))
        
        console.log(toDelete)
        
        const user = await getCookie('Visionary_user_data')
        const email = user.email

        await doRequest('projects/projects', 'delete', { email: email, projects_id: toDelete })
        setreloadDeleteds(prev => prev + 1)
        
    }

    const handlePageChange = (page) => {setCurrentPage(page)}


    useEffect(() => {
        if (activeMode === null) {
            setReload(prev => prev + 1)
        }
    }, [activeMode])
    
    useEffect(() => {
        const askForProjects = async () => {
            try {
                var userData = getCookie('Visionary_user_data')
                const result = await doRequest('projects', 'get', userData)
                
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
    }, [reloadDeleteds])

    
    const projects = projectsFromUser.map((project, index) => ({
        name: project.title || `Project ${index + 1}`,
        link: project.link,
        id: project.id
    }))
    
    var favoriteIds = JSON.parse(localStorage.getItem("favorites")) || []
    
    const favorites = projects.filter(project => favoriteIds.includes(String(project.id)))
    const nonFavorites = projects.filter(project => !favoriteIds.includes(String(project.id)))
    const sortedProjects = [...favorites, ...nonFavorites]
    
    
    const itemsPerPage = 8
    const totalPages = Math.ceil(projects.length / itemsPerPage)
    const currentItems = sortedProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="flex flex-col h-screen w-screen">
            <GoBack to={'/home'}/>
            <div className="ml-auto mt-10 mr-10 mb-4">
                <Input className="rounded-3xl w-72" placeholder='Search...'/>
            </div>
            <div className="w-fit h-10 rounded-3xl flex flex-row-reverse gap-8 ml-auto mr-4">
                <div className="relative">
                    <button className={`${activeMode === "delete" ? "bg-[#e23b3be0]" : "bg-[#48BEBC]"} p-0 w-10 mr-24 relative`} onClick={() => {handleClick("delete")}}>
                        <svg width="40" height="40" className="p-1" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"/>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/>
                            <path d="M14 11v6"/>
                        </svg>
                    </button>
                    { activeMode === 'delete' &&
                    <button className="w-10 h-6 p-0 mt-1 absolute left-0 top-11" onClick={() => {handleDeleteConfirm()}}>
                        <svg className="mx-auto mb-2" width={25} height={20} fill="none" stroke="green" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12l5 5L20 7"/>
                        </svg>
                    </button>
                    }
                </div>
  
                <button className={`${activeMode === 'favorite' ? "bg-[#dfbb1c]" : "bg-[#48BEBC]"} p-0 w-10`} onClick={() => {handleClick("favorite")}}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill={`${activeMode === 'favorite'? "white" : "none"}`} className="p-0.5 m-auto" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2"></polygon>
                    </svg>
                </button>

                <button className={`${showNewProject ? "bg-[#1ca1df]" : "bg-[#48BEBC]"} p-0 w-10`}
                    onClick={() => {setShowNewProject(true)}}>
                    <svg width="40" height="40" viewBox="0 0 24 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>

            <div className="w-4/6 m-auto h-4/12 max-h-min" key={reload}>
                    {projects.length > 0 ? (
                        <section className="flex flex-wrap justify-center">
                            {currentItems.map((item) => (
                                <ProjectCard name={item.name} id={item.id} mode={activeMode} />
                            ))}
                        </section>
                    ) : (
                        <h2 className="text-gray-200 text-2xl mb-20">Looks like you don't have any project yet.</h2>
                    )}
                {projects.length >= itemsPerPage + 1 && (
                <div className="space-x-1 absolute bottom-32 right-[50%] transform translate-x-1/2 translate-y-1/2">
                    <button disabled={currentPage === 1} className="hover:bg-slate-300"
                    onClick={() => handlePageChange(currentPage - 1)}>
                        {'<'}
                    </button>
                    <button disabled={currentPage === totalPages} className="hover:bg-slate-300"
                    onClick={() => handlePageChange(currentPage + 1)}>
                        {'>'}
                    </button>
                </div>
                )}
            </div>

            {showNewProject && (
                <div 
                    className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
                    onClick={() => setShowNewProject(false)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <NewProject onClose={() => setShowNewProject(false)} />
                    </div>
                </div>
            )}

            {showConfirmDelete && (
                <div 
                    className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
                    onClick={() => setShowConfirmDelete(false)}>

                    <button type="button" className="bg-transparent absolute top-2 right-3 text-2xl font-bold">✖</button>
                    <div onClick={(e) => e.stopPropagation()}>
                        <div className="w-96 h-36 bg-gray-400 rounded-2xl flex flex-col">
                            <h3 className="text-xl m-auto font-bold bg-gray-200 rounded-2xl w-11/12 h-12 p-2">Are you sure you want to delete?</h3>
                            <div className="mb-5 flex flex-row gap-4 mx-auto text-slate-100 bg-gray-200 rounded-2xl w-8/12 h-12 p-2 items-center">
                                <button className="bg-green-400 w-28 h-10 p-2" onClick={() => handleAskDelteButton(1)}>Yes</button>
                                <button className="bg-red-400 w-28 h-10 p-2" onClick={() => handleAskDelteButton(0)}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Projects
