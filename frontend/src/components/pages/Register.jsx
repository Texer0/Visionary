import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import validator from 'validator'
import { Link, useNavigate } from 'react-router-dom'


import FormConteiner from '../Forms/FormConteiner/FormConteiner'
import Input from '../Forms/Input/Input'
import { style_warning, style_success, style_error, style_info } from '../../utils/styles_warnings'
import { doRequest } from '../../utils/requests'
import GoBack from '../GoBack/GoBack'


const Register = ({}) => {
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
        <>
            <GoBack to={'/'}/>
            <FormConteiner>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div>
                        <Input type='text' placeholder='Username' 
                            {...register('username')} required/>

                        <Input type='email' placeholder='Email' 
                            {...register('email')} required/>

                        <Input placeholder='Password' type='password'
                            {...register('password')} required />

                        <Input placeholder='Repeat password' type='password' 
                            {...register('password_repeated')} required/>
                    </div>
                    <div>
                        <button className='m-2 w-48 h-14 rounded-[20px] text-2xl bg-[#48BEBC] text-white pt-3'
                        type="submit">Submit</button>
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