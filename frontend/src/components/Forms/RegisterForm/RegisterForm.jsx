import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import validator from 'validator'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import FormConteiner from '../FormConteiner/FormConteiner'
import Input from '../Input/Input'
import { style_warning, style_success, style_error, style_info } from '../../../styles_warnings'
import { doRequest } from '../../../requests'


const RegisterForm = ({}) => {
    const { register, handleSubmit, watch, reset, formState: { errors }, setError } = useForm()
    const navigate = useNavigate()
    const handleSubmitForm = async (event) => {
        const username = watch('username')
        const email = watch('email')
        const password = watch('password')
        const password_repeated = watch('password_repeated')

        
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
        }

        if (result.data.data) {
            toast.error(result.data.data, {
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
            return
        } else {
            toast.error(result.data, {
                duration: 3000,
                style: style_error,
            })
            return
        }
    }

    return (
        <FormConteiner>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div>

                <Input type='text' placeholder='Username' 
                    {...register('username')} required/>
                <br/>

                <Input type='email' placeholder='Email' 
                    {...register('email')} required/>
                <br/>

                <Input placeholder='Password' type='password'
                    {...register('password')} required />
                <br/>

                <Input placeholder='Repeat password' type='password' 
                    {...register('password_repeated')} required/>

            </div>
            <div>
                <button className='m-2 w-[200px] h-[60px] rounded-[20px] text-2xl bg-[#48BEBC] text-white'
                type="submit">Submit</button>
            </div>
        </form>
        </FormConteiner>
    )
}

export default RegisterForm