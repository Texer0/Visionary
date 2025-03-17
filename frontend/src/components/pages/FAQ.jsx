import { Link } from "react-router-dom"
import GoBack from "../GoBack/GoBack"

function FAQ() {
    const SUPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL
    return (
        <>
        <GoBack to={'/'}/>

        <div className="bg-white w-[95vw] h-[41vw] rounded-3xl p-7 overflow-y-auto">
            <h1 className="text-gray-800 text-left">Frecuently Asked Questions (FAQ)</h1>
            <hr class="w-full h-0.5 bg-gray-300 my-4"/>
            <div className="flex flex-col gap-5 pl-6">

                <div>
                    <h3 className="w-fit text-xl font-medium text-gray-700">
                        How can I invite teammates to my project?
                    </h3>
                    <p className="text-lg text-gray-600 mt-1 text-left pl-6">
                        You can invite your teammates from the options of the project, entering their emails.
                    </p>
                </div>

                <hr class="w-9/12 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"/>
         
                <div>
                    <h3 className="w-fit text-xl font-medium text-gray-700">
                        Is there a limit for the number of collaborators or projects I can have?
                    </h3>
                    <p className="text-lg text-gray-600 mt-1 text-left pl-6">
                        No, there's no limit in both options.
                    </p>
                </div>

                <hr class="w-9/12 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"/>

                <div>
                    <h3 className="w-fit text-xl font-medium text-gray-700">
                        How can I contact to the Visionary's Team?
                    </h3>
                    <p className="text-lg text-gray-600 mt-1 text-left pl-6">
                        You can contact us at <a href={`mailto:${SUPORT_EMAIL}`} className="text-blue-500 hover:underline">{SUPORT_EMAIL}</a>.
                    </p>
                </div>

                <hr class="w-9/12 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"/>

                <div>
                    <h3 className="w-fit text-xl font-medium text-gray-700">
                        How can i delete my account?
                    </h3>
                    <p className="text-lg text-gray-600 mt-1 text-left pl-6">
                        You can delete your account in the configuration user. <span className="font-bold">Take care that this will eliminate all your data permanently.</span>
                    </p>
                </div>

            </div>
        </div>
    </>
    )
}

export default FAQ