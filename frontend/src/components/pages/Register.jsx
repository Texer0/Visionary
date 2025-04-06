import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import validator from 'validator'
import { Link, useNavigate } from 'react-router-dom'

import FormConteiner from '../Forms/FormConteiner/FormConteiner'
import Input from '../Forms/Input/Input'
import { style_warning, style_success, style_error, style_info } from '../../utils/styles_warnings'
import { doRequest } from '../../utils/requests'
import GoBack from '../GoBack/GoBack'
import { useState } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const Register = ({}) => {
    const { register, handleSubmit, watch, reset, formState: { errors }, setError } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            password_repeated: ""
        }
    })
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleSubmitForm = async () => {
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const password_repeated = document.getElementById('password_repeated').value

        if (isSubmitting) return

        setIsSubmitting(true)
        
        if (username.length < 6) {
            toast.warning('Name must be at least 6 character', {
                duration: 3000,
                style: style_warning,
            })
            return
        }

        if (!validator.isEmail(email)) {
            toast.warning('Email invalid', {
                duration: 3000,
                style: style_warning,
            })
            return
        }

        if (password.length < 8) {
            toast.warning('The password must be at least 8 characters', {
                duration: 3000,
                style: style_warning,
            })
            return
        }
        
        if (password != password_repeated) {
            toast.warning('Passwords do not match', {
                duration: 3000,
                style: style_warning,
            })
            return
        }

        try {
            var result = await doRequest('register', 'POST', { 
                name: username,
                email: email,
                password: password
            })

        } catch (e) {
            toast.error('A problem has ocurred with registration', {
                duration: 3000,
                style: style_error,
            })
            return
        } finally {
            setIsSubmitting(false)
        }

        if (result.data) {
            toast.error(result.data, {
                duration: 3000,
                style: style_error,
            })
            return
        }
        
        if (result.status >= 200 && result.status < 300) {
            toast.success('Registration successful', {
                duration: 3000,
                style: style_success,
            })
            navigate('/home')
        } else {
            toast.error(result.data, {
                duration: 3000,
                style: style_error,
            })
        }
    }

    return (
        <>
            <GoBack to={'/'}/>
            <FormConteiner>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div>
                        <Input id={'username'} type='text' placeholder='Username' 
                            {...register('username')} required/>

                        <Input id={'email'} type='email' placeholder='Email' 
                            {...register('email')} required/>

                        <Input id={'password'} type='password' placeholder='Password'
                            {...register('password')} required />

                        <Input id={'password_repeated'} type='password' placeholder='Repeat password'
                            {...register('password_repeated')} required/>
                    </div>
                    <div>
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
                    </div>
                </form>
            </FormConteiner>
            <Link to= '/login'>
                <p className='text-end pr-8 transition-all duration-300 transform hover:brightness-150 hover:text-indigo-300'>Already have an account?</p>
            </Link>
        </>
    )
}

export default Register