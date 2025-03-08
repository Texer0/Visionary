import { Link } from "react-router-dom"

const Welcome = () => {
    return (
<body className="bg-gradient-to-b from-[#0842caa9] via-gray-200 to-black flex flex-col text-center w-screen">
    
    <header className="mt-10">
        <img src="src/assets/Visionary.png" alt="logo" width={500} className={`w-[1000px] mt-8 transition-all duration-1000 transform hover:scale-105 hover:brightness-150`}/>
    </header>
    
    <p className="mt-4 text-white text-2xl pt-8">Visionary has as target give a platform that helps with management and collaboration of projects between working teams.</p>
    
    <Link to='/register'>
        <button className="mt-4 px-6 py-2 bg-yellow-400 rounded-full shadow-md hover:bg-yellow-300">Start now</button>
    </Link>
    

<div className="flex flex-col items-center gap-20 mt-40 mb-40 w-7/12">
	<div className="flex justify-start">
		<div className="bg-white p-6 rounded-xl shadow-md w-7/12 flex row">
			<img src="src/assets/screenshoot.png" alt="logo" width={200} className={``}/>
			<div className="pl-6">
				<h2 className="text-xl font-semibold align-middle pb-1">Project management made easy</h2>
				<p className="text-gray-800 text-start">Keep full control of your projects with intuitive tools. Organize tasks, assign responsibilities and track them in real time.</p>
			</div>
		</div>
	</div>
	<div className="flex justify-end">
		<div className="bg-white p-6 rounded-xl shadow-md w-7/12 flex row">
			<img src="src/assets/team organization.png" alt="logo" width={200} className={`rounded-xl`}/>
			<div className="pl-6">
				<h2 className="text-xl font-semibold align-middle pb-1">Efficient collaboration</h2>
				<p className="text-gray-800 text-start">Facilitate teamwork with a centralized platform. Share information in one place, view progress on interactive dashboards, and improve internal communication.</p>
			</div>
		</div>
	</div>
	<div className="flex justify-start">
		<div className="bg-white p-6 rounded-xl shadow-md w-7/12 flex row">
			<img src="src/assets/security.png" alt="logo" width={180} className={``}/>
			<div className="pl-6">
				<h2 className="text-xl font-semibold align-middle pb-1">Data protection guaranteed</h2>
				<p className="text-gray-800 text-start">Your data is 100% protected with advanced encryption and secure authentication. We make sure that your privacy is guaranteed at all times.</p>
			</div>
		</div>
	</div>
</div>

    <footer className="mt-auto bg-black text-white w-full py-4 text-end pr-6 pl-6">
		<p className="text-sm text-center">© 2025 Visionary. All rights reserved.</p>
		<div class="flex justify-center gap-4 mt-2">
			<a href="/privacy" className="hover:underline">Privacy Policy</a>
			<a href="/terms" className="hover:underline">Terms and conditions</a>
			<a href="mailto:soporte@example.com" className="hover:underline">Contact</a>
		</div>
    </footer>


</body>
    )
  }
  
  export default Welcome
  