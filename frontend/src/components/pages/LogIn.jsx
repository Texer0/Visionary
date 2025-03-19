import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

import { style_warning, style_success, style_error, style_info } from '../../utils/styles_warnings'
import FormConteiner from '../Forms/FormConteiner/FormConteiner'
import Input from '../Forms/Input/Input'
import { doRequest } from '../../utils/requests'
import GoBack from '../GoBack/GoBack'

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

function LogIn () {
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
        <>
            <GoBack to={'/'}/>
            <FormConteiner>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div>
                        <Input type='email' placeholder='Email'{...register('email')} required/>
                        <Input type='password' placeholder='Password' {...register('password')} required/>
                    </div>
                    <div className='m-2'>
                        <button className='w-44 h-14 rounded-2xl text-2xl bg-[#48BEBC] text-white p-3'
                        type="submit">Submit</button>
                    </div>
                </form>
            </FormConteiner>
            <Link to= '/register'>
                <p className='text-end pr-8 transition-all duration-300 transform hover:brightness-150 hover:text-indigo-300'>Do not have an account?</p>
            </Link>
        </>
    )
}

export default LogIn