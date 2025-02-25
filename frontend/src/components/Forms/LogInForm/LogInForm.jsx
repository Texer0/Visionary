import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import dotenv from 'dotenv'

import { style_warning, style_success, style_error, style_info } from '../../../utils/styles_warnings'
import FormConteiner from '../FormConteiner/FormConteiner'
import Input from '../Input/Input'
import { doRequest } from '../../../utils/requests'

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

function LogInForm () {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()
    const navigate = useNavigate()

    const handleSubmitForm = async (event) => {
        const email = watch('email')
        const password = watch('password')

        try {
            var result = await doRequest('login', 'POST', {
                email: email,
                password: password
            })

        } catch (e) {
            toast.error('A problem has ocurred while log in', {
                duration: 3000,
                style: style_error,
            })
            if (DEBUG) {console.log(e)}
            return
        }

        if (result.status >= 200 && result.status < 300) {
            toast.success('Login successful', {
                duration: 3000,
                style: style_success,
            })
            navigate('/home')
            return
        } else {
            toast.error(result.data, {
                duration: 3000,
                style: style_error,
            })
            return
        }
    }

    if(DEBUG) {console.log(errors)}


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