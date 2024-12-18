import Button from "../Button/Button";

const Home = () => {
    return (
        <div className="text-white">
            <h1 className="font-bold text-7xl m-4">Home page</h1>
            <div className="justify-items-start">
            <li>Warning en RegisterForm y LogInForm</li>
            <li>Warning en LogInForm</li>
            <li>Warning en NewProject</li>
            <li>PostCSS for production</li>

            </div>

            <Button toPage='/projects'>Projects</Button>
            <Button toPage='/project'>Project</Button>

        </div>
    )
}

export default Home;