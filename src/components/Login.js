import { useState } from "react";
import '../styles/Login.css';

import { Link } from "react-router-dom";

function Login() {

    const [datos, setDatos] = useState({usr: '-', pwd:'-'});
    const [admin] = useState({usr: 'admin', pwd:'Admin1234'})

    const resultado = () => {
        const usrIngresado = document.querySelector('#usr').value
        const pwdIngresado = document.querySelector('#pwd').value

        if(admin.usr === usrIngresado && admin.pwd === pwdIngresado) {
            setDatos({
                usr: usrIngresado, 
                pwd: pwdIngresado
            })
            document.querySelector('#estado').innerText = 'Validado'
        } else {
            setDatos({
                usr: '-', 
                pwd: '-'
            })
            document.querySelector('#estado').innerText = 'No es admin'
        }
        document.querySelector('#usr').value = ''
        document.querySelector('#pwd').value = ''
    }

    return(
        <div className='loginContainer'>
            <h1 className='tit'>Entidad Bancaria - Ingreso</h1>
            <div className='form'>
                <p><label>Usuario: </label><input id='usr' type='text'></input></p>
                <p><label>Contraseña: </label><input id='pwd' type='text'></input></p>
                <p><button onClick={() => resultado()}>INICIAR SESIÓN</button></p>
                
            </div>
            {/* <a href='/form' target='_blank'>registro</a> */}
            <button className='btn-salida'><Link to='/form'>REGISTRARSE</Link></button>
            <button><Link to='/menu'>MENU</Link></button> 
            <p><label id='estado'>No es admin</label></p>
            <p><label>Usuario: {datos.usr}</label></p>
            <p><label>Contraseña:  {datos.pwd}</label></p>
        </div>
    )

}

export default Login;