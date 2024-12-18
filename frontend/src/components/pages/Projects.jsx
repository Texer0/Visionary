import { Link } from "react-router-dom"
import ProjectCard from "../ProjectCard/ProjectCard"
import Button from "../Button/Button"
import { useState } from "react"

function Projects() {    
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
                // change for database
    const data = Array.from({ length: 14 }, (_, index) => ({    
        id: index,
        name: `Project ${index + 1}`,
    }))

    const totalPages = Math.ceil(data.length / itemsPerPage)

    const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
    <div className="w-4/6 m-auto">
        <div>
        {data.length > 0 ? (
            <section className={`flex flex-wrap justify-center`}>
                {currentItems.map((item) => (
                    <Link key={item.id} to={`/project/${item.id}`}>
                        <ProjectCard id={item.id} />
                    </Link>
                ))}
            </section>
        ) : (
            <Button toPage="/new_project">New project</Button>
        )}
        </div>
            {data.length >= itemsPerPage + 1 ?
                <div className="space-x-1 absolute bottom-32 right-[50%] transform translate-x-1/2 translate-y-1/2">
                    <button disabled={currentPage === 1} className="hover:bg-slate-300"
                    onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                    </button>
                    <button disabled={currentPage === totalPages} className="hover:bg-slate-300"
                    onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                    </button>
                </div> : null
            }
    </div>
    )
}

export default Projects
