import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

import { style_warning, style_success, style_error, style_info } from '../../utils/styles_warnings'
import FormConteiner from '../Forms/FormConteiner/FormConteiner'
import Input from '../Forms/Input/Input'
import { doRequest } from '../../utils/requests'
import GoBack from '../GoBack/GoBack'
import { useState } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const DEBUG = parseInt(import.meta.env.VITE_DEBUG)

function LogIn () {
    const { register, handleSubmit, reset, formState: { errors }, watch, getValues } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleSubmitForm = async () => {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        if (isSubmitting) return

        setIsSubmitting(true)

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
        } finally {
            setIsSubmitting(false)
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
        }
    }

    if (DEBUG) console.log(errors)

    return (
        <>
            <GoBack to={'/'}/>
            <FormConteiner>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div>
                        <Input id={'email'} type='email' placeholder='Email'{...register('email')} required/>
                        <Input id={'password'} type='password' placeholder='Password' {...register('password')} required/>
                    </div>
                    <div className='m-2'>
                        <button type="submit" disabled={isSubmitting}
                            className={`w-44 h-14 rounded-2xl text-2xl bg-[#48BEBC] text-white px-10 p-3 transition-all duration-200 relative
                            ${isSubmitting ? 'bg-[#8DCCCC]' : 'bg-[#48BEBC]'}`}>
                                {isSubmitting && (
                                    <div className='absolute top-1 left-14'>
                                        <LoadingSpinner width='14' height='12'
                                        radio_1='10' radio_2='1'/>
                                    </div>
                                )}
                                {!isSubmitting && 'Submit'}
                        </button>
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