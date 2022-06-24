import React, { useState } from 'react'
import Input from '../../components/UI/Input'
import { useAuthContext } from '../../contexts/AuthContext'
import { authe } from '../firebase'
import { useNavigate } from 'react-router-dom/'
import '../../styles/Login.css'
import Swal from 'sweetalert2'

const Login = () => {

    const localstorage=window.localStorage

    const [form, setForm] = useState({
        user: '',
        password: '',
    })
    const navigate = useNavigate()
    const { setAuth } = useAuthContext()

    const handleChange = name => e => {
        setForm({ ...form, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginAccount();
    }

    const validateForm = () => {
        let error = '';
        if (form.user.replace(' ', '') === '') error += "El usuario no puede estar vacio<br>"
        if (form.password.replace(' ', '') === '') error += "La contraseña no puede estar vacia<br>"
        if (form.password.replace(' ', '').length <= 6) error += "La contraseña debe ser mayor a 6 caracteres<br>"
        return error;
    }


    const loginAccount = async () => {
        const error = validateForm()
        if (error === '') {
            try {
                const res = await authe.signInWithEmailAndPassword(form.user, form.password)
                if (res) {
                    setAuth(res)
                    localstorage.setItem('auth',res)
                    navigate('/', { replace: true })
                    Swal.fire('OK!','SE HA INICIADO CORRECTAMENTE','success');
                }
            } catch (error) {
                if (error.code === 'auth/wrong-password') {
                    Swal.fire('ERROR!','Correo/Contraseña invalidos','error');
                }
                if (error.code === 'auth/user-not-found') {
                    Swal.fire('ERROR!','Correo no registrado','error');
                }
                if (error.code === 'auth/invalid-email') {
                    Swal.fire('ERROR!','Email no valido','error');
                }
            }
        } else {
            Swal.fire('ERROR',error,'error');
        }
    }

    return (
        <div className='login'>

            <form className='login__container' onSubmit={handleSubmit}>
                <h3>LOGIN</h3>
                <p>Please login to your account</p>
                <Input
                    className={'input--text input--login'}
                    id={'user'}
                    type={'email'}
                    required
                    onChange={handleChange('user')}
                />
                <p>Please login to your password</p>
                <Input
                    className={'input--text input--login'}
                    id={'password'}
                    type={'password'}
                    required
                    onChange={handleChange('password')}
                />
                <Input
                    id='enviar'
                    className='input--btn'
                    type='submit'
                    value={'Login'}
                />
                <div className="d-flex align-items-center justify-content-center pb-4">
                    <Input
                        id='register'
                        className='input--btn'
                        type='button'
                        value={'Create acccount'}
                        onClick={() => navigate("/register", { replace: true })}
                    />
                </div>
            </form>
            <aside className='login__aside'>
                <img src="https://images-ext-2.discordapp.net/external/KlatTCqAe9VZkIoL1embIwy5cKl0Ux3KwBOFMtJoJog/%3Fk%3D20%26m%3D1167904834%26s%3D170667a%26w%3D0%26h%3DCJgdMUo0_ZJF55k_FWj146PHWNISWeCUPp1q-3TnJzA%3D/https/media.istockphoto.com/vectors/happy-woman-sitting-at-desk-and-working-on-laptop-computer-vector-id1167904834" alt="login__image" />
            </aside>
        </div>




    )
}

export default Login;
