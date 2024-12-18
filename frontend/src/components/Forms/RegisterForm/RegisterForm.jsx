import { useForm } from 'react-hook-form'
import FormConteiner from '../FormConteiner/FormConteiner'
import Input from '../Input/Input'
import { toast } from 'sonner'
import { style_warning, style_success, style_error, style_info } from '../../../styles_warnings'

const RegisterForm = ({}) => {
    const { register, handleSubmit, watch, reset, formState: { errors }, setError } = useForm()

    fetch('http://localhost:4000/register')
        .then(response => response.json())
        .then(data => console.log(data))

    const handleSubmitForm = (event) => {
        const username = watch('username')
        const email = watch('email')
        const password = watch('password')
        const password_repeated = watch('password_repeated')

        // si la contraseña no es la indicada
        // Si el email ya está en uso
        // Si el username ya está en uso
        
        if (password != password_repeated) {
            toast.warning('Passwords do not match', {
                duration: 40000,
                style: style_warning,
            })
        }
              


        console.log("Fuera del handler", username)
        console.log("Fuera del handler", email)
        console.log("Fuera del handler", password)
        console.log("Fuera del handler", password_repeated)

        reset()
    }


    console.log(errors)

    return (
        <FormConteiner>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className=''>

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