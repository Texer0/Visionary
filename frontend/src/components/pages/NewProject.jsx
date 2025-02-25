import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import Input from "../Forms/Input/Input"
import { doRequest } from "../../utils/requests"
import { style_error, style_success } from "../../utils/styles_warnings"
import { getCookie } from "../../utils/coockie_managment"


function NewProject() {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()

    const navigate = useNavigate()

    const handleSubmitForm = async () => {
        const title = watch('title')
        const description = watch('description')
        const link = watch('link')

        const user = await getCookie('Visionary_user_data')

        const data = {
            title: title,
            description: description,
            link: link,
            email: user.email
        }

        const result = await doRequest('bd_request/new_project', 'POST', data)
        console.log("Result: ", result)
        if (result.status === 201 && result.id) {
            toast.success("Creation success", {
                duration: 3000,
                style: style_success,
            })

            // navigate(`/project:${result.id}`)
        }

        if (result.status === 500) {
            toast.error("Internal Server Error", {
                duration: 3000,
                style: style_error,
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>

        <div className={`bg-[#4f9eb6] shadow-[0px_0px_10px_10px_rgba(0,0,0,0.3)] 
        rounded-[60px] content-center w-[25rem] place-items-center pb-4
        h-[32rem] `}>

            <h2 className="text-white font-bold mb-10 text-4xl">Create Project</h2>
            <div className="">

                <h2 className="text-white text-2xl font-bold float-start">Title</h2><span className="text-red-600 float-start text-2xl font-bold">*</span>
                <br />
                <Input type="text" name="title" id="title" {...register('title')} required/>
                <br />
                <h2 className="float-start text-white text-2xl font-bold">Description</h2>
                <br />
                <Input type="text" name="description" id="description" {...register('description')}/>
                <br />
                <h2 className="float-start text-white text-2xl font-bold">Github</h2>
                <br />
                <Input type="text" name="github" id="github" {...register('link')}/>
            </div>

            <div className="float-end mr-8 mt-2">
                <button className='p-1 w-[130px] h-[50px] rounded-[20px] text-2xl bg-[#48BEBC] text-white'
                type="submit">Submit</button>
            </div>
        </div>
        </form>
    )
}

export default NewProject