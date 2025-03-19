import { Link } from "react-router-dom"
import { useState } from "react";
import FAQ_Question from "./FAQ_Question/FAQ_Question";

const Welcome = () => {
    const SUPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL
    
    return (
<div className="bg-gradient-to-b from-[#0842caa9] via-gray-200 to-black flex flex-col w-screen min-h-screen">
    
    <header className="mt-10 mx-auto">
        <img src="src/assets/Visionary.png" alt="logo" className={`w-[1000px] mt-8 transition-all duration-1000 transform hover:scale-105 hover:brightness-150`}/>
    </header>
    
    <p className="w-fit mx-auto mt-4 text-white text-2xl pt-8">Visionary has as target give a platform that helps with management and collaboration of projects between working teams.</p>
    
    <button className="mx-auto mt-4 px-6 py-2 bg-yellow-400 rounded-full shadow-md transition-all duration-500 transform hover:brightness-105 hover:bg-yellow-300">
        <Link to='/register' className="">
            Start now
        </Link>
    </button>
    

    <div className="flex flex-col gap-20 mt-40 mb-40 w-7/12 mx-auto">
        <div className="flex justify-start">
            <div className="bg-white p-6 rounded-xl shadow-md w-7/12 flex row">
                <img src="src/assets/screenshoot.png" alt="logo" width={200}/>
                <div className="pl-6">
                    <h2 className="text-xl font-semibold align-middle pb-1">Project management made easy</h2>
                    <p className="text-gray-800 text-start">Keep full control of your projects with intuitive tools. Organize tasks, assign responsibilities and track them in real time.</p>
                </div>
            </div>
        </div>
        <div className="flex justify-end">
            <div className="bg-white p-6 rounded-xl shadow-md w-7/12 flex row">
                <img src="src/assets/team_organization.png" alt="logo" width={200} className={`rounded-xl`}/>
                <div className="pl-6">
                    <h2 className="text-xl font-semibold align-middle pb-1">Efficient collaboration</h2>
                    <p className="text-gray-800 text-start">Facilitate teamwork with a centralized platform. Share information in one place, view progress on interactive dashboards, and improve internal communication.</p>
                </div>
            </div>
        </div>
        <div className="flex justify-start">
            <div className="bg-white p-6 rounded-xl shadow-md w-7/12 flex row">
                <img src="src/assets/security.png" alt="logo" width={180}/>
                <div className="pl-6">
                    <h2 className="text-xl font-semibold align-middle pb-1">Data protection guaranteed</h2>
                    <p className="text-gray-800 text-start">Your data is 100% protected with advanced encryption and secure authentication. We make sure that your privacy is guaranteed at all times.</p>
                </div>
            </div>
        </div>
        
        <div className="w-fit max-w-3xl p-6 bg-white rounded-2xl shadow-lg mr-auto mt-48 relative">
            
            <h2 className="text-3xl font-bold text-gray-800 absolute left-6 top-5">FAQ</h2>
            <div className="space-y-4 text-left p-4 mt-6">

                <FAQ_Question
                title={'What is Visionary?'} 
                description={'Visionary is a platform designed for improve in management of projects, allowing the teams to collaborate efficiently and secure.'}/>
                
                <FAQ_Question 
                title={"It's free?"} 
                description={"Yes, it's completely free and open to the public."}/>

                <FAQ_Question 
                title={'Can I personalize the permissions of my teams?'} 
                description={'Yes, Visionary allows to assing differents roles and levels of access according to the needs of the project.'}/>

                <FAQ_Question 
                title={'Are my data safe?'} 
                description={'Yes, we use encryption extreme to extreme and protocols of security, to protect your information.'}/>

                <details className="group">
                    <summary className="w-fit cursor-pointer text-lg font-medium text-gray-700 hover:text-blue-500 transition">
                        Have another doubt?
                    </summary>
                    <p className="text-lg text-gray-600 mt-2 opacity-0 transition duration-500 ease-in-out group-open:opacity-100 group-open:translate-x-5">
                        You can see more in <a href={`/FAQ`} className="text-blue-500 hover:underline">this page</a>.
                    </p>
                </details>

            </div>
        </div>
    </div>

    <footer className="bg-black text-white py-4 w-screen">
        <p className="text-sm text-center">© 2025 Visionary. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms and conditions</a>
            <a href={`mailto:${SUPORT_EMAIL}`} className="hover:underline">Contact</a>
        </div>
    </footer>

</div>
    )
}
  
  export default Welcome
  