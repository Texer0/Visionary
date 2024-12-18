import Input from "../Forms/Input/Input"
import { useForm } from "react-hook-form"

function NewProject() {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()

    const handleSubmitForm = (event) => {
        const title = watch('title')
        const description = watch('description')
        const link = watch('link')

        // check Database

        console.log("Fuera del handler", title)
        console.log("Fuera del handler", description)
        console.log("Fuera del handler", link)

        reset()
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