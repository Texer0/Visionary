function Task({title, color, date_expiration}) {
    console.log(title, color, date_expiration)
    return (
        <div className="mb-1 mt-1">
            <div className={`bg-[${color}] h-9 rounded-t-2xl`}></div>
            <div className="bg-black rounded-b-2xl">
                <div className="text-xs p-1 text-left pl-2 mb-3">
                        <span className="">
                            {title}    
                        </span>
                    </div>
                <div className="bg-black text-xs pb-4 mr-44 rounded-b-2xl">
                    <span className="">
                        {date_expiration}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Task