import Button from "../Button/Button";

const Home = () => {
    return (
        <div className="text-white">
            <h1 className="font-bold text-7xl m-4">Home page</h1>
            <div className="justify-items-start">
            <li>Warning en NewProject</li>
            <li>CSS for production: https://tailwindcss.com/docs/installation/using-vite</li>

            </div>

            <Button toPage='/projects'>Projects</Button>

        </div>
    )
}

export default Home;