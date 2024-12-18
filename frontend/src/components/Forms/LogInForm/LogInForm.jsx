import { useForm } from 'react-hook-form'
import FormConteiner from '../FormConteiner/FormConteiner'
import Input from '../Input/Input'

function LogInForm () {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()

    const handleSubmitForm = (event) => {
        const email = watch('email')
        const password = watch('password')

        // Check Database

        console.log("Fuera del handler", email)
        console.log("Fuera del handler", password)

        reset()
    }

    console.log(errors)

    return (
        <FormConteiner>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div>
                    <Input type='email' placeholder='Email'{...register('email')} required/>
                    <br/>
                    <Input type='password' placeholder='Password' {...register('password')} required/>
                </div>

                <div className='m-2'>
                    <button className=' w-[200px] h-[60px] rounded-[20px] text-2xl bg-[#48BEBC] text-white'
                    type="submit">Submit</button>
                </div>
            </form>
        </FormConteiner>
    )
}

export default LogInForm