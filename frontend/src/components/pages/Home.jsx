import Button from "../Button/Button";

const Home = () => {
    return (
        <>
            <div className="w-[96vw] h-[45vw] flex flex-row gap-3">
                <div className="bg-white h-[100%] w-2/12 rounded-3xl shadow-xl shadow-black">

                </div>
                <div className="flex flex-col rounded-3xl w-10/12 gap-3">
                    <div className="bg-white w-[100%] h-1/4 rounded-3xl shadow-xl shadow-black">

                    </div>
                    <div className="bg-white w-[100%] h-3/4 rounded-3xl shadow-xl shadow-black">
                        <div className="justify-items-start">
                            <li>Warning en NewProject</li>
                            <li>CSS for production: https://tailwindcss.com/docs/installation/using-vite</li>
                        </div>

            <Button toPage='/projects'>Projects</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home;