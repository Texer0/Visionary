function ProjectCard({name}) {
    
    const handleProjectButton = (name) => {
        console.log('Pressed, name: ', name)
    }

    
    return (
        <button className="p-0 mb-5 m-5 bg-transparent focus:outline-none hover:outline-none
        transform transition-transform duration-300 hover:translate-y-[-10px]" 
        onClick={() => handleProjectButton(name)}>
            <div>
                <h3 className="w-72 rounded-t shadow-md overflow-hidden 
                text-xl font-semibold opacity-100 bg-gray-600 bg-opacity-30 text-white p-4 text-center">{name}</h3>
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