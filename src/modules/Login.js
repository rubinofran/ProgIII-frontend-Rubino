import { useState, useEffect } from "react";
import '../styles/Login.css';
import { Link, useNavigate } from "react-router-dom";

// Servicios
import localStorageService from "../services/localStorage";
import userService from "../services/users";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate()
    
	const error = (errorMessage) => {
		window.alert("Error: " + errorMessage);
	};

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await userService.validateUserAndCreateToken({
                userName: username,
                password: password
            })
            if (response.data.token) {
                const payload = { user: response.data.user, token: response.data.token };
                localStorageService.setLS(payload);
            }
            setUsername('')
            setPassword('')
            /* MEJORAR */
            username.includes('admin') 
                ? navigate("/admin-menu")            
                : navigate("/menu")
        } catch (err) {
            console.log('Password o usuario inválidos. Error: ', err);
            error('Password o usuario inválidos')
        }

    }

    useEffect(() => {
		async function login() {
			try {
				const userLogged = await localStorageService.getLS();
				if (!userLogged) {
                    console.log('Local storage vacío');
				} else {
					console.log('Usuario logueado: ', userLogged.user);
				}
			} catch (err) {
				console.log('Error al intentar obtener el token de usuario. Error: ', err);
			}
		}
		login();
	}, []);

    return(
        <div className='loginContainer'>
            <h1 className='tit'>Entidad Bancaria - Ingreso</h1>
            <form onSubmit={handleLogin} className='form'>
                <p>
                    <label>Usuario: </label>
                    <input 
                        type='email'
                        value={username}
                        placeholder='Ingrese su correo electrónico'
                        onChange={({target}) => setUsername(target.value)}
                        required
                    />
                </p>
                <p>
                    <label>Contraseña: </label>
                    <input 
                        type='password'
                        value={password}
                        placeholder='Ingrese su contraseña'
                        onChange={({target}) => setPassword(target.value)}
                        required
                    />
                </p>
                <p><button>INICIAR SESIÓN</button></p>
            </form>
            {/* <a href='/form' target='_blank'>registro</a> */}
            <button className='btn-salida'><Link to='/form'>REGISTRARSE</Link></button>
            {/* <button><Link to='/menu'>MENU</Link></button> */} 
        </div>
    )

}

export default Login;