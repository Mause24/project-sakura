import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Input from '../../components/UI/Input'
import '../../styles/Registers.css'
import { authe, dataBase } from '../firebase'

const Register = () => {

    const INITIAL_STATE = {
        user: '',
        password: '',
        confirmPassword: ''
    }

    const navigate = useNavigate()

    const [form, setForm] = useState(INITIAL_STATE)

    const handleChange = name => e => {
        setForm({ ...form, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        registerAccount();
    }
    

    const validateForm = () => {
        let error = '';
        if (form.user.replace(' ', '') === '') error += "El usuario no puede estar vacio<br>"
        if (form.password.replace(' ', '') === '') error += "La contraseña no puede estar vacia<br>"
        if (form.confirmPassword.replace(' ', '') === '') error += "La confirmacion de la contraseña no puede estar vacia<br>"
        if (form.password.replace(' ', '').length <= 6) error += "La contraseña debe ser mayor a 6 caracteres<br>"
        if (form.password.replace(' ', '') !== form.confirmPassword.replace(' ', '')) error += "Las contraseñas no coinciden<br>"
        return error;
    }


    const registerAccount = async () => {
        const error = validateForm()
        if (error === '') {
            try {
                const res = await authe.createUserWithEmailAndPassword(form.user, form.password)
                if (res) {
                    navigate('/', { replace: true })
                    await dataBase().collection(res.user.uid).add()
                    Swal.fire('OK!', 'SE HA REGISTRADO EL USUARIO CORRECTAMENTE', 'success');
                }
            } catch (error) {
                if (error.code === 'auth/invalid-email') {
                    console.error('Email no valido');
                }
                if (error.code === 'auth/email-already-in-use') {
                    console.error('Este correo ya se encuentra en uso');
                }
            }
        } else {
            Swal.fire('ERROR', error, 'error');
        }
    }

    return (
        <div className='register'>
            <form className='register__container' onSubmit={handleSubmit}>
                <h3>REGISTER</h3>
                <p>Please Register your account</p>
                <Input
                    className={'input--text input--register'}
                    id={'user'}
                    type={'email'}
                    required
                    onChange={handleChange('user')}
                />
                <p>Please register your password</p>
                <Input
                    className={'input--text input--register'}
                    id={'password'}
                    type={'password'}
                    required
                    onChange={handleChange('password')}
                />
                <p>Please confirm your password</p>
                <Input
                    className={'input--text input--register'}
                    id={'confirmPassword'}
                    type={'password'}
                    required
                    onChange={handleChange('confirmPassword')}
                />
                <Input
                    id='enviar'
                    className='input--btn'
                    type='submit'
                    value={'Register'}
                />
            </form>
            <aside className='register__aside'>
                <img src="https://images-ext-2.discordapp.net/external/KlatTCqAe9VZkIoL1embIwy5cKl0Ux3KwBOFMtJoJog/%3Fk%3D20%26m%3D1167904834%26s%3D170667a%26w%3D0%26h%3DCJgdMUo0_ZJF55k_FWj146PHWNISWeCUPp1q-3TnJzA%3D/https/media.istockphoto.com/vectors/happy-woman-sitting-at-desk-and-working-on-laptop-computer-vector-id1167904834" alt="login__image" />
            </aside>
        </div>
    )
}

export default Register