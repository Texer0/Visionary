function NotFound () {
    return (
        <div className="w-screen h-screen bg-black bg-opacity-60 flex flex-row justify-center p-20">
            <div className="w-11/12 bg-slate-500 rounded-3xl shadow-[0px_0px_10px_10px_rgba(0,0,0,0.1)]">
                <img src="src/assets/404.svg" className="w-screen " alt="Error 404"/>
                <div className="p-4 bg-slate-300 text-gray-800 w-fit m-auto rounded-2xl shadow-[0px_0px_10px_10px_rgba(0,0,0,0.2)]">
                    <h1 className="font-semibold">404 Not Found</h1> 
                    <p>The page attempted to visit is not found.</p>
                </div>
            </div>
        </div>
    )
}

export default NotFound