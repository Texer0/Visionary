import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ProjectCard({name, id, mode}) {  
    const [isSelected, setIsSelected] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setIsSelected(false)
    }, [mode])

    useEffect(() => {
        const lista = JSON.parse(localStorage.getItem("favorites")) || []
        if (lista.includes(`${id}`)) {
            setIsFavorite(true)
        }
    }, [id])

    
    const handleProjectButton = () => {
        if (!mode) {
            navigate(`/project/${id}`)
        } else {
            setIsSelected(!isSelected)
            if (mode === 'favorite') {
                setIsFavorite(!isFavorite)
                if (isFavorite) {
                    let favorites = JSON.parse(localStorage.getItem("favorites")) || []
                    favorites = favorites.filter(item => item !== `${id}`)
                    localStorage.setItem("favorites", JSON.stringify(favorites))
                    return
                }
                let favorites = JSON.parse(localStorage.getItem("favorites")) || []
                favorites.push(`${id}`)
                favorites = [...new Set([...favorites, `${id}`])]
                localStorage.setItem("favorites", JSON.stringify(favorites))
            }
            if (mode === 'delete') {
                if (isSelected) {
                    let toDelete = JSON.parse(localStorage.getItem("toDelete")) || []
                    toDelete = toDelete.filter(item => item !== `${id}`)
                    return localStorage.setItem("toDelete", JSON.stringify(toDelete))
                }
                let toDelete = JSON.parse(localStorage.getItem("toDelete")) || []
                toDelete.push(`${id}`)
                toDelete = [...new Set([...toDelete, `${id}`])]
                localStorage.setItem("toDelete", JSON.stringify(toDelete))
            }
        }
    }
    
    return (
            <button className={`p-0 mb-5 m-5 bg-transparent
            transform transition-transform duration-300 hover:translate-y-[-1rem]`}
            onClick={() => handleProjectButton()}>
                <div className={`opacity-100 ${isFavorite ? 'bg-yellow-400 bg-opacity-50' : "bg-gray-600 bg-opacity-30"}  w-72 relative rounded-t`}>
                    <h3 className=" shadow-md text-xl font-semibold text-white p-4 text-center">{name}</h3>
                    { mode === 'delete' && 
                        <svg className="absolute -top-2 left-0" width="60" height="60" viewBox="0 0 100 100">
                            <circle className="" cx="50" cy="50" r="20" stroke="white" stroke-width="4" fill={isSelected ? "red" :"none"} />
                        </svg>
                    }
                    { mode === 'favorite' ?  
                        <svg width="40" height="40" viewBox="0 0 24 24" fill={`${isFavorite? "white" : "none"}`} className="p-0.5 m-auto absolute -top-2 right-0" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2"></polygon>
                        </svg>
                        : ( isFavorite &&
                            <svg width="40" height="40" viewBox="0 0 24 24" fill={`${isFavorite? "white" : "none"}`} className="p-0.5 m-auto absolute -top-2 right-0" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2"></polygon>
                            </svg>
                        )
                    }
                </div>
                <div className="bg-white bg-opacity-50 h-6">
                    <p className="flex p-1 pb-0 pt-0 h-6" >Progress:</p>
                    <div className="bg-white bg-opacity-50 h-3 rounded-b ">
                        <div className="progress-bar bg-gray-200 h-2 w-10/12 rounded-full m-auto">
                            <div className="progress-bar-animated w-8/12 h-full rounded-full bg-[#2BC9BC]" />
                            </div>
                        </div>
                    </div>
            </button>
)}

export default ProjectCard