function Task({title, color, date_expiration}) {
    console.log(title, color, date_expiration)
    return (
        <div className="mb-1 mt-1">
            <div className={`bg-[${color}] h-9 rounded-t-2xl`}></div>
            <div className="bg-black rounded-b-2xl">
                <div className="text-xs p-1 text-left pl-2 mb-3">
                        <span className="text-lg">
                            {title}    
                        </span>
                    </div>
                <div className="text-xs pb-3 pl-2 rounded-b-2xl flex flex-row gap-1">
                    <svg width="20" height="20"  viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#fff" stroke-width="5"/>
                        <line x1="50" y1="50" x2="50" y2="30" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
                        <line x1="50" y1="50" x2="70" y2="50" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
                        <circle cx="50" cy="50" r="3" fill="#fff"/>
                    </svg>
                    <span className="inline-flex items-center">
                        {date_expiration}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Task