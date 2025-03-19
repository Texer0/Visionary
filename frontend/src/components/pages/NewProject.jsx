import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import Input from "../Forms/Input/Input"
import { doRequest } from "../../utils/requests"
import { style_error, style_success, style_warning } from "../../utils/styles_warnings"
import { getCookie } from "../../utils/coockie_managment"
import { useState } from "react"

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

function NewProject({ onClose }) {
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

        try {
            const result = await doRequest('projects/new_project', 'POST', data)
            console.log("Result: ", result)
            if (result.status === 201 && result.id) {
                toast.success("Creation success", {
                    duration: 3000,
                    style: style_success,
                })
                onClose()
                navigate(`/project/:${result.id}`)
            }
            
            if (result.status === 409) {
                toast.error(result.message, {
                    duration: 3000,
                    style: style_warning,
                })
            }

            if (result.status === 500) {
                toast.error("Internal Server Error", {
                    duration: 3000,
                    style: style_error,
                })
            }
        } catch (e) {
            if(DEBUG) {console.log(e)}
            toast.error("Can not connect", {
                duration: 3000,
                style: style_error,
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <button onClick={onClose} type="button" className="bg-transparent absolute top-2 right-3 text-2xl font-bold">
                ✖
            </button>
            <div className={`bg-[#4f9eb6] shadow-[0px_0px_10px_10px_rgba(0,0,0,0.3)] 
                rounded-[4rem] w-[26rem] h-90 pb-4 text-white font-bold text-2xl`}>
                
                <h2 className=" font-bold mb-7 text-5xl text-center pt-6">Create Project</h2>
                <div>
                    <div className="float-start pl-12">
                        <h2 className="inline-block">Title</h2>
                        <span className="text-red-600 inline-block text-2xl font-bold ml-1">*</span>
                    </div>
                    <Input className='text-black font-normal' type="text" name="title" {...register('title')} required/>
                    <h2 className="mt-2 float-start pl-12">Description</h2>
                    <Input className='text-black font-normal' type="text" name="description" {...register('description')}/>
                    <h2 className="mt-2 float-start pl-12">Github</h2>
                    <Input className='text-black font-normal' type="text" name="github" {...register('link')}/>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="p-1 w-36 h-12 rounded-2xl text-2xl bg-[#48BEBC] text-white" type="submit">
                        Create
                    </button>
                </div>
            </div>
        </form>
    )
}

export default NewProject